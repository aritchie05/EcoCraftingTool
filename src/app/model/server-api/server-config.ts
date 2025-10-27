import {signal, Signal} from '@angular/core';

export interface ServerConfig {
  id: string;                     // Unique identifier (e.g., 'default', 'white-tiger')
  name: string;
  hostname: string;               // Base URL (e.g., 'white-tiger.play.eco')
  isCustom: boolean;              // Flag for custom servers
  connectionEstablished: boolean; // Flag for whether we know the server is valid in this session
}

export interface ServerGroup {
  id: string;
  name: string;
  servers: Signal<ServerConfig[]>;
}

export const PREDEFINED_SERVERS: ServerGroup = {
  id: 'predefined-servers',
  name: 'Predefined Servers',
  servers: signal([
    {
      id: 'default',
      name: 'Default (Vanilla)',
      hostname: '',
      isCustom: false,
      connectionEstablished: true
    },
    {
      id: 'white-tiger',
      name: 'White Tiger',
      hostname: 'white-tiger.play.eco',
      isCustom: false,
      connectionEstablished: false
    }
  ])
};

const CUSTOM_SERVERS: ServerGroup = {
  id: 'custom-servers',
  name: 'Custom Servers',
  servers: signal([
    {
      id: 'add-new',
      name: 'Add New...',
      hostname: '',
      isCustom: true,
      connectionEstablished: false
    }
  ])
};

export const serverGroups: Signal<ServerGroup[]> = signal([PREDEFINED_SERVERS, CUSTOM_SERVERS]);
