import {signal, Signal, WritableSignal} from '@angular/core';

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
      name: signal('Default (Vanilla)'),
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
    }
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
      useInsecureHttp: signal(false),
      connectionEstablished: signal(false)
    }
  ])
};

export const serverGroups: Signal<ServerGroup[]> = signal([PREDEFINED_SERVERS, CUSTOM_SERVERS]);
