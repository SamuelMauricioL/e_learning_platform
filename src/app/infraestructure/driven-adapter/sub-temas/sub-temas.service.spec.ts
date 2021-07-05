import { TestBed } from '@angular/core/testing';

import { SubTemasService } from './sub-temas.service';

describe('SubTemasService', () => {
  let service: SubTemasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubTemasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
