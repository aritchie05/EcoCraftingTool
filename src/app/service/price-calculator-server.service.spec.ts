import {signal} from '@angular/core';
import {TestBed} from '@angular/core/testing';

import {PriceCalculatorServerService} from './price-calculator-server.service';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';
import {Item} from '../model/item';
import {Output} from '../model/output';
import {ServerDataResponse} from '../model/server-api/server-data-response';
import {ServerConfig} from '../model/server-api/server-config';
import {ServerOutput} from '../model/server-api/server-recipe';

describe('PriceCalculatorServerService', () => {
  let service: PriceCalculatorServerService;
  let httpMock: HttpTestingController;
  let outputsMatch: (serverOutputs: ServerOutput[] | undefined, existingOutputs: Output[]) => boolean;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(PriceCalculatorServerService);
    httpMock = TestBed.inject(HttpTestingController);
    outputsMatch = Reflect.get(service, 'outputsMatch').bind(service) as
      (serverOutputs: ServerOutput[] | undefined, existingOutputs: Output[]) => boolean;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('gets mock recipes', async () => {
    const mockResponse = {
      Recipes: [
        {id: 1, name: 'Test Recipe'},
        {id: 2, name: 'Another Recipe'}
      ]
    };

    service.getAllRecipes(true).subscribe(result => {
      expect(result).toBeTruthy();
      expect(result.Recipes.length).toBeGreaterThan(0);
    });

    const req = httpMock.expectOne(request => request.url.includes('recipes'));
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('gets mock items', async () => {
    const mockResponse = {
      AllItems: {
        'DummyItem': {
          'PropertyInfos': {
            'Name': {
              'String': 'DummyItem'
            },
            'DisplayName': {
              'LocString': 'Dummy Item'
            }
          }
        }
      }
    };

    service.getAllItems(true).subscribe(result => {
      expect(result).toBeTruthy();
      expect(result.AllItems['DummyItem']).toBeTruthy();
      expect(result.AllItems['DummyItem'].PropertyInfos.DisplayName.LocString).toEqual('Dummy Item');
      expect(result.AllItems['DummyItem'].PropertyInfos.Name.String).toEqual('DummyItem');
    });

    const req = httpMock.expectOne(request => request.url.includes('allItems'));
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('routes insecure HTTP servers through the proxy on HTTPS pages', () => {
    const isHttpsContextSpy = vi.spyOn(service as unknown as { isHttpsContext: () => boolean }, 'isHttpsContext');
    isHttpsContextSpy.mockReturnValue(true);
    const serverConfig = createServerConfig('eco.greenleafserver.com:3021', true);
    let connectionSucceeded = false;

    service.attemptConnection(serverConfig).subscribe(result => connectionSucceeded = result);

    const req = httpMock.expectOne('/api/server-proxy');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({host: 'eco.greenleafserver.com:3021'});

    req.flush(createServerDataResponse());

    expect(connectionSucceeded).toBe(true);
    expect(serverConfig.connectionEstablished()).toBe(true);
  });

  it('keeps insecure HTTP servers direct on non-HTTPS pages', () => {
    const isHttpsContextSpy = vi.spyOn(service as unknown as { isHttpsContext: () => boolean }, 'isHttpsContext');
    isHttpsContextSpy.mockReturnValue(false);
    const serverConfig = createServerConfig('eco.greenleafserver.com:3021', true);
    let connectionSucceeded = false;

    service.attemptConnection(serverConfig).subscribe(result => connectionSucceeded = result);

    httpMock.expectNone('/api/server-proxy');

    const itemsReq = httpMock.expectOne('http://eco.greenleafserver.com:3021/api/v1/plugins/EcoPriceCalculator/allItems');
    const recipesReq = httpMock.expectOne('http://eco.greenleafserver.com:3021/api/v1/plugins/EcoPriceCalculator/recipes');
    expect(itemsReq.request.method).toBe('GET');
    expect(recipesReq.request.method).toBe('GET');

    itemsReq.flush(createServerDataResponse().itemsResponse);
    recipesReq.flush(createServerDataResponse().recipesResponse);

    expect(connectionSucceeded).toBe(true);
    expect(serverConfig.connectionEstablished()).toBe(true);
  });

  it('keeps HTTPS servers direct even on HTTPS pages', () => {
    const isHttpsContextSpy = vi.spyOn(service as unknown as { isHttpsContext: () => boolean }, 'isHttpsContext');
    isHttpsContextSpy.mockReturnValue(true);
    const serverConfig = createServerConfig('white-tiger.play.eco', false);
    let connectionSucceeded = false;

    service.attemptConnection(serverConfig).subscribe(result => connectionSucceeded = result);

    httpMock.expectNone('/api/server-proxy');

    const itemsReq = httpMock.expectOne('https://white-tiger.play.eco/api/v1/plugins/EcoPriceCalculator/allItems');
    const recipesReq = httpMock.expectOne('https://white-tiger.play.eco/api/v1/plugins/EcoPriceCalculator/recipes');
    expect(itemsReq.request.method).toBe('GET');
    expect(recipesReq.request.method).toBe('GET');

    itemsReq.flush(createServerDataResponse().itemsResponse);
    recipesReq.flush(createServerDataResponse().recipesResponse);

    expect(connectionSucceeded).toBe(true);
    expect(serverConfig.connectionEstablished()).toBe(true);
  });

  it('infers non-static Ashlar byproducts when the server omits output static flags', () => {
    const serverOutputs = JSON.parse(`[
      {"Name":"Ashlar Basalt","NameID":"AshlarBasaltItem","Ammount":10},
      {"Name":"Crushed Basalt","NameID":"CrushedBasaltItem","Ammount":4}
    ]`) as ServerOutput[];

    const existingOutputs = [
      createOutput('Ashlar Basalt', 'AshlarBasaltItem', 10, false),
      createOutput('Crushed Basalt', 'CrushedBasaltItem', 4, true)
    ];

    expect(outputsMatch(serverOutputs, existingOutputs)).toBe(true);
    expect(serverOutputs[0].IsStatic).toBe(true);
    expect(serverOutputs[1].IsStatic).toBe(false);
  });

  it('infers non-static Barrel outputs when the recipe has additional outputs', () => {
    const serverOutputs = JSON.parse(`[
      {"Name":"Barrel","NameID":"BarrelItem","Ammount":1},
      {"Name":"Water","NameID":"WaterItem","Ammount":10}
    ]`) as ServerOutput[];

    const existingOutputs = [
      createOutput('Barrel', 'BarrelItem', 1, true),
      createOutput('Water', 'WaterItem', 10, false)
    ];

    expect(outputsMatch(serverOutputs, existingOutputs)).toBe(true);
    expect(serverOutputs[0].IsStatic).toBe(false);
    expect(serverOutputs[1].IsStatic).toBe(true);
  });

  it('keeps single-output Barrel recipes static when the server omits output static flags', () => {
    const serverOutputs = JSON.parse(`[
      {"Name":"Barrel","NameID":"BarrelItem","Ammount":1}
    ]`) as ServerOutput[];

    const existingOutputs = [
      createOutput('Barrel', 'BarrelItem', 1, false)
    ];

    expect(outputsMatch(serverOutputs, existingOutputs)).toBe(true);
    expect(serverOutputs[0].IsStatic).toBe(true);
  });

  it('infers non-static Sulfur outputs when the recipe has additional outputs', () => {
    const serverOutputs = JSON.parse(`[
      {"Name":"Sulfur","NameID":"SulfurItem","Ammount":2},
      {"Name":"Iron Concentrate","NameID":"IronConcentrateItem","Ammount":4}
    ]`) as ServerOutput[];

    const existingOutputs = [
      createOutput('Sulfur', 'SulfurItem', 2, true),
      createOutput('Iron Concentrate', 'IronConcentrateItem', 4, false)
    ];

    expect(outputsMatch(serverOutputs, existingOutputs)).toBe(true);
    expect(serverOutputs[0].IsStatic).toBe(false);
    expect(serverOutputs[1].IsStatic).toBe(true);
  });

  it('keeps single-output Sulfur recipes static when the server omits output static flags', () => {
    const serverOutputs = JSON.parse(`[
      {"Name":"Sulfur","NameID":"SulfurItem","Ammount":2}
    ]`) as ServerOutput[];

    const existingOutputs = [
      createOutput('Sulfur', 'SulfurItem', 2, false)
    ];

    expect(outputsMatch(serverOutputs, existingOutputs)).toBe(true);
    expect(serverOutputs[0].IsStatic).toBe(true);
  });
});

function createOutput(name: string, nameID: string, quantity: number, reducible: boolean): Output {
  return {
    item: new Item({
      name,
      nameID,
      tag: false
    }),
    quantity,
    reducible,
    primary: true
  };
}

function createServerConfig(hostname: string, useInsecureHttp: boolean): ServerConfig {
  return {
    id: 'test-server',
    name: signal('Test Server'),
    hostname: signal(hostname),
    isCustom: true,
    useInsecureHttp: signal(useInsecureHttp),
    connectionEstablished: signal(false)
  };
}

function createServerDataResponse(): ServerDataResponse {
  return {
    itemsResponse: {
      AllItems: {}
    },
    recipesResponse: {
      Recipes: []
    }
  };
}
