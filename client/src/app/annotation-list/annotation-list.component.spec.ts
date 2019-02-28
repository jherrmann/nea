import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationListComponent } from './annotation-list.component';
import { AnnotationService } from '../annotation.service';
import { Observable } from 'rxjs';
import { Annotation } from '../annotation';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

class MockAnnotationService {
  getAllAnnotations(): Observable<Array<Annotation>> { return new Observable() };
  getAnnotationSetNames(): Observable<Array<string>> { return new Observable() };
};


describe('AnnotationListComponent', () => {
  let component: AnnotationListComponent;
  let fixture: ComponentFixture<AnnotationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatListModule, MatSelectModule, NoopAnimationsModule],
      declarations: [AnnotationListComponent],
      providers: [{ provide: AnnotationService, useClass: MockAnnotationService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
