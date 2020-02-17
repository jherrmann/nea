import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotatorEditorComponent } from './annotator-editor.component';
import { AnnotationService } from '../annotation.service';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { EntitytypeListComponent } from '../entitytype-list/entitytype-list.component';
import { MatListModule } from '@angular/material/list';
import { AnnotationListComponent } from '../annotation-list/annotation-list.component';
import { Observable } from 'rxjs';
import { Annotation } from '../annotation';
import { EntityType } from '../entitytype';
import { HotkeysService } from 'angular2-hotkeys';
import { EntityService } from '../entitytype.service';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

class MockAnnotationService {
  getAnnotation(): Observable<Array<Annotation>> { return new Observable() };
  getAllAnnotations(): Observable<Array<Annotation>> { return new Observable() };
  getAnnotationSetNames(): Observable<Array<string>> { return new Observable() };
};

class MockEntityService {
  getEntities(setNames: Array<string>): Observable<Array<EntityType>> { return new Observable() };
  getEntitySetNames(): Observable<Array<string>> { return new Observable() };
};

describe('AnnotatorEditorComponent', () => {
  let component: AnnotatorEditorComponent;
  let fixture: ComponentFixture<AnnotatorEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, MatGridListModule, MatListModule, MatSelectModule, NoopAnimationsModule],
      declarations: [EntitytypeListComponent, AnnotatorEditorComponent, AnnotationListComponent],
      providers: [{ provide: AnnotationService, useClass: MockAnnotationService }, { provide: EntityService, useClass: MockEntityService }, { provide: HotkeysService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotatorEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
