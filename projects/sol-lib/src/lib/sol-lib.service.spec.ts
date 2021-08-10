import { TestBed } from '@angular/core/testing';

import { SolLibService } from './sol-lib.service';

describe('SolLibService', () => {
  let service: SolLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
