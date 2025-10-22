export interface ServerConfig {
  id: string;           // Unique identifier (e.g., 'default', 'white-tiger')
  name: string;         // Display name
  hostname: string;     // Base URL (e.g., 'https://white-tiger.play.eco')
  isCustom: boolean;    // Flag for custom servers
}

export const PREDEFINED_SERVERS: ServerConfig[] = [
  {
    id: 'default',
    name: 'Default (Vanilla)',
    hostname: '',
    isCustom: false
  },
  {
    id: 'white-tiger',
    name: 'White Tiger',
    hostname: 'https://white-tiger.play.eco',
    isCustom: false
  }
];
