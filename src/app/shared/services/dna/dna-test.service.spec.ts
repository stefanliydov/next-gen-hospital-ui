import { TestBed } from '@angular/core/testing';

import { DnaTestService } from './dna-test.service';

describe('DnaTestService', () => {
  let service: DnaTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DnaTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
