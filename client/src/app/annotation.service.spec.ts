import { TestBed, inject } from '@angular/core/testing';

import { AnnotationService } from './annotation.service';
import { EntityService } from './entitytype.service';
import { HttpClient } from '@angular/common/http';


describe('AnnotationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnnotationService, { provide: EntityService }, { provide: HttpClient }]
    });
  });

  it('should be created', inject([AnnotationService], (service: AnnotationService) => {
    expect(service).toBeTruthy();
  }));
});
