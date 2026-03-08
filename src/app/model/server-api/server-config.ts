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
  labelMessageId: string;
  servers: WritableSignal<ServerConfig[]>;
}

export const PREDEFINED_SERVERS: ServerGroup = {
  id: 'predefined-servers',
  labelMessageId: 'predefinedServersGroupLabel',
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
      id: 'awl-gaming',
      name: signal('AWL Gaming'),
      hostname: signal('eco.awlgaming.net'),
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
    }
  ])
};

export const CUSTOM_SERVERS: ServerGroup = {
  id: 'custom-servers',
  labelMessageId: 'customServersGroupLabel',
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
