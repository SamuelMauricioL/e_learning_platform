import { TestBed } from '@angular/core/testing';

import { GradosService } from './grados.service';

describe('GradosService', () => {
  let service: GradosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
