import {TestBed} from '@angular/core/testing';

import {CraftingDataService} from './crafting-data.service';
import {HttpClientModule} from '@angular/common/http';

describe('CraftingDataService', () => {
  let service: CraftingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(CraftingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
