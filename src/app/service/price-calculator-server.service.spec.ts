import {TestBed} from '@angular/core/testing';

import {PriceCalculatorServerService} from './price-calculator-server.service';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';

describe('PriceCalculatorServerService', () => {
  let service: PriceCalculatorServerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(PriceCalculatorServerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('gets mock recipes', (done: DoneFn) => {
    const mockResponse = {
      Recipes: [
        {id: 1, name: 'Test Recipe'},
        {id: 2, name: 'Another Recipe'}
      ]
    };

    service.getAllRecipes(true).subscribe(result => {
      expect(result).toBeTruthy();
      expect(result.Recipes.length).toBeGreaterThan(0);
      done();
    });

    const req = httpMock.expectOne(request => request.url.includes('recipes'));
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('gets mock items', (done: DoneFn) => {
    const mockResponse = {
      AllItems: {
        "DummyItem": {
          "PropertyInfos": {
            "Name": {
              "String": "DummyItem"
            },
            "DisplayName": {
              "LocString": "Dummy Item"
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
      done();
    });

    const req = httpMock.expectOne(request => request.url.includes('allItems'));
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
