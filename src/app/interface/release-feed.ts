export interface ReleaseFeed {
  title: string;
  lastUpdated: Date;
  releases: Release[];
}

export interface Release {
  lastUpdated: Date;
  link: string;
  title: string;
  notes: string;
}
