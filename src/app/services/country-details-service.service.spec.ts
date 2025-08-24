import { TestBed } from '@angular/core/testing';

import { CountryDetailsServiceService } from './country-details-service.service';

describe('CountryDetailsServiceService', () => {
  let service: CountryDetailsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryDetailsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
