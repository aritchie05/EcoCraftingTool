import {TestBed} from '@angular/core/testing';

import {CraftingDataService} from './crafting-data.service';

describe('CraftingDataService', () => {
  let service: CraftingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CraftingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
