import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { EntityService } from './entitytype.service';


class MockHttpService {

}

describe('EntityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntityService, { provide: HttpClient, useClass: MockHttpService }]
    });
  });

  it('should be created', inject([EntityService], (service: EntityService) => {
    expect(service).toBeTruthy();
  }));
});
