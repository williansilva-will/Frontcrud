import { TestBed } from '@angular/core/testing';

import { ValidaçõesService } from './validações.service';

describe('ValidaçõesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidaçõesService = TestBed.get(ValidaçõesService);
    expect(service).toBeTruthy();
  });
});
