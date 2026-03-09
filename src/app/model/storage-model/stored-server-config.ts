import {ServerConfig} from '../server-api/server-config';

export class StoredServerConfig {
  id: string;
  name: string;
  hostname: string;
  isCustom: boolean;
  useInsecureHttp: boolean;
  connectionEstablished: boolean;

  constructor(serverConfig: ServerConfig) {
    this.id = serverConfig.id;
    this.name = serverConfig.name();
    this.hostname = serverConfig.hostname();
    this.isCustom = serverConfig.isCustom;
    this.useInsecureHttp = serverConfig.useInsecureHttp();
    this.connectionEstablished = serverConfig.connectionEstablished();
  }
}
