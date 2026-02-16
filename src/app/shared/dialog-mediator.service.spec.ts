import { TestBed } from '@angular/core/testing';

import { DialogMediatorService } from './dialog-mediator.service';

describe('DialogMediatorService', () => {
  let service: DialogMediatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogMediatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
