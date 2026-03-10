const {lookup} = require('node:dns/promises');
const {isIP} = require('node:net');

const ecoPriceCalculatorBasePath = '/api/v1/plugins/EcoPriceCalculator';
const requestTimeoutMs = 10_000;

class ProxyRequestError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'ProxyRequestError';
    this.status = status;
  }
}

module.exports = async function handler(request, response) {
  if (request.method !== 'POST') {
    response.status(405).json({error: 'Method not allowed'});
    return;
  }

  const body = normalizeRequestBody(request.body);
  if (typeof body.host !== 'string') {
    response.status(400).json({error: 'Request body must include a host string.'});
    return;
  }

  try {
    const host = await validatePublicHost(body.host);
    const [itemsResponse, recipesResponse] = await Promise.all([
      fetchEcoPriceCalculatorResponse(host, '/allItems'),
      fetchEcoPriceCalculatorResponse(host, '/recipes')
    ]);

    response.status(200).json({itemsResponse, recipesResponse});
  } catch (error) {
    if (error instanceof ProxyRequestError) {
      response.status(error.status).json({error: error.message});
      return;
    }

    response.status(500).json({error: 'Unexpected proxy error.'});
  }
};

function normalizeRequestBody(body) {
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }

  if (body && typeof body === 'object') {
    return body;
  }

  return {};
}

async function validatePublicHost(rawHost) {
  const trimmedHost = rawHost.trim();
  if (!trimmedHost) {
    throw new ProxyRequestError(400, 'Host is required.');
  }

  if (trimmedHost.includes('://')) {
    throw new ProxyRequestError(400, 'Provide only host[:port], not a full URL.');
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(`http://${trimmedHost}`);
  } catch {
    throw new ProxyRequestError(400, 'Host must be a valid host[:port] value.');
  }

  if (parsedUrl.username || parsedUrl.password || parsedUrl.pathname !== '/' || parsedUrl.search || parsedUrl.hash) {
    throw new ProxyRequestError(400, 'Host must only contain host[:port].');
  }

  const hostname = parsedUrl.hostname.toLowerCase();
  if (!hostname) {
    throw new ProxyRequestError(400, 'Host must include a hostname.');
  }

  const ipVersion = isIP(hostname);
  if (ipVersion !== 0) {
    if (!isPublicIpAddress(hostname)) {
      throw new ProxyRequestError(400, 'Private, loopback, and reserved IP ranges are not allowed.');
    }
    return parsedUrl.host;
  }

  if (hostname === 'localhost' || hostname.endsWith('.localhost') || hostname.endsWith('.local')) {
    throw new ProxyRequestError(400, 'Local hostnames are not allowed.');
  }

  let resolvedAddresses;
  try {
    resolvedAddresses = await lookup(hostname, {all: true, verbatim: true});
  } catch {
    throw new ProxyRequestError(400, 'Host could not be resolved.');
  }

  if (resolvedAddresses.length === 0 || resolvedAddresses.some(record => !isPublicIpAddress(record.address))) {
    throw new ProxyRequestError(400, 'Host resolves to a private, loopback, or reserved address.');
  }

  return parsedUrl.host;
}

async function fetchEcoPriceCalculatorResponse(host, endpoint) {
  const upstreamUrl = `http://${host}${ecoPriceCalculatorBasePath}${endpoint}`;
  const response = await fetch(upstreamUrl, {
    signal: AbortSignal.timeout(requestTimeoutMs),
    redirect: 'error',
    headers: {
      accept: 'application/json'
    }
  });

  if (!response.ok) {
    throw new ProxyRequestError(502, `Upstream ${endpoint} request failed with status ${response.status}.`);
  }

  try {
    return await response.json();
  } catch {
    throw new ProxyRequestError(502, `Upstream ${endpoint} response was not valid JSON.`);
  }
}

function isPublicIpAddress(address) {
  return isIPv4Address(address) ? isPublicIPv4Address(address) : isPublicIPv6Address(address);
}

function isIPv4Address(address) {
  return isIP(address) === 4;
}

function isPublicIPv4Address(address) {
  const octets = address.split('.').map(Number);
  const [first, second, third] = octets;

  if (octets.length !== 4 || octets.some(octet => Number.isNaN(octet) || octet < 0 || octet > 255)) {
    return false;
  }

  if (first === 0 || first === 10 || first === 127) {
    return false;
  }

  if (first === 100 && second >= 64 && second <= 127) {
    return false;
  }

  if (first === 169 && second === 254) {
    return false;
  }

  if (first === 172 && second >= 16 && second <= 31) {
    return false;
  }

  if (first === 192 && second === 168) {
    return false;
  }

  if (first === 192 && second === 0 && (third === 0 || third === 2)) {
    return false;
  }

  if (first === 192 && second === 88 && third === 99) {
    return false;
  }

  if (first === 198 && (second === 18 || second === 19)) {
    return false;
  }

  if (first === 198 && second === 51 && third === 100) {
    return false;
  }

  if (first === 203 && second === 0 && third === 113) {
    return false;
  }

  if (first >= 224) {
    return false;
  }

  return true;
}

function isPublicIPv6Address(address) {
  const normalized = address.toLowerCase();

  if (normalized === '::' || normalized === '::1') {
    return false;
  }

  if (normalized.startsWith('fc') || normalized.startsWith('fd')) {
    return false;
  }

  if (normalized.startsWith('fe8') || normalized.startsWith('fe9') || normalized.startsWith('fea') || normalized.startsWith('feb')) {
    return false;
  }

  if (normalized.startsWith('ff')) {
    return false;
  }

  if (normalized.startsWith('2001:db8')) {
    return false;
  }

  return true;
}
