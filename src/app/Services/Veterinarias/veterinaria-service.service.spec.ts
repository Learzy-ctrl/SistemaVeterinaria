import { TestBed } from '@angular/core/testing';

import { VeterinariaServiceService } from './veterinaria-service.service';

describe('VeterinariaServiceService', () => {
  let service: VeterinariaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VeterinariaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
