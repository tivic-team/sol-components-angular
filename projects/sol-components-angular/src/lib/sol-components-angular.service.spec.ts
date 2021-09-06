import { TestBed } from '@angular/core/testing';

import { SolComponentsAngularService } from './sol-components-angular.service';

describe('SolComponentsAngularService', () => {
  let service: SolComponentsAngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolComponentsAngularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
