import { TestBed } from '@angular/core/testing';

import { ClasstypeService } from './classtype.service';

describe('ClasstypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClasstypeService = TestBed.get(ClasstypeService);
    expect(service).toBeTruthy();
  });
});
