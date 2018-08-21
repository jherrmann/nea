import { TestBed, inject } from '@angular/core/testing';

import { EntityService } from './entitytype.service';

describe('EntityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntityService]
    });
  });

  it('should be created', inject([EntityService], (service: EntityService) => {
    expect(service).toBeTruthy();
  }));
});
