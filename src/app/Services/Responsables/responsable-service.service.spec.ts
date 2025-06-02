import { TestBed } from '@angular/core/testing';

import { ResponsableServiceService } from './responsable-service.service';

describe('ResponsableServiceService', () => {
  let service: ResponsableServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsableServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
