import {signal, WritableSignal} from '@angular/core';

export interface ServerConfig {
  id: string;
  name: WritableSignal<string>;
  hostname: WritableSignal<string>;  // Base URL (e.g., 'white-tiger.play.eco')
  isCustom: boolean;
  useInsecureHttp: WritableSignal<boolean>;
  connectionEstablished: WritableSignal<boolean>;
}

export interface ServerGroup {
  id: string;
  name: string;
  servers: WritableSignal<ServerConfig[]>;
}

export const PREDEFINED_SERVERS: ServerGroup = {
  id: 'predefined-servers',
  name: 'Predefined Servers',
  servers: signal([
    {
      id: 'default',
      name: signal('Vanilla'),
      hostname: signal(''),
      isCustom: false,
      useInsecureHttp: signal(false),
      connectionEstablished: signal(true)
    },
    {
      id: 'white-tiger',
      name: signal('White Tiger'),
      hostname: signal('white-tiger.play.eco'),
      isCustom: false,
      useInsecureHttp: signal(false),
      connectionEstablished: signal(false)
    },
    {
      id: 'greenleaf',
      name: signal('Greenleaf'),
      hostname: signal('148.251.154.60:3021'),
      isCustom: false,
      useInsecureHttp: signal(true),
      connectionEstablished: signal(false)
    },
    {
      id: 'silvermoon',
      name: signal('Silvermoon'),
      hostname: signal('79.137.98.112:3001'),
      isCustom: false,
      useInsecureHttp: signal(true),
      connectionEstablished: signal(false)
    },
    {
      id: 'eco-antics',
      name: signal('Eco Antics'),
      hostname: signal('98.142.1.172:3001'),
      isCustom: false,
      useInsecureHttp: signal(true),
      connectionEstablished: signal(false)
    },
    {
      id: 'be-eco',
      name: signal('BeEco'),
      hostname: signal('51.255.77.221:3001'),
      isCustom: false,
      useInsecureHttp: signal(true),
      connectionEstablished: signal(false)
    },
  ])
};

export const CUSTOM_SERVERS: ServerGroup = {
  id: 'custom-servers',
  name: 'Custom Servers',
  servers: signal([
    {
      id: 'add-new',
      name: signal('Add New...'),
      hostname: signal(''),
      isCustom: true,
      useInsecureHttp: signal(true),
      connectionEstablished: signal(false)
    }
  ])
};

export const serverGroups: ServerGroup[] = [PREDEFINED_SERVERS, CUSTOM_SERVERS];
