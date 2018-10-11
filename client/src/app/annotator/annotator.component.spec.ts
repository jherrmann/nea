import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotatorComponent } from './annotator.component';
import { AnnotationService } from '../annotation.service';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { EntitytypeListComponent } from '../entitytype-list/entitytype-list.component';
import { MatListModule } from '@angular/material/list';
import { AnnotationListComponent } from '../annotation-list/annotation-list.component';
import { Observable } from 'rxjs';
import { Annotation } from '../annotation';
import { EntityType } from '../entitytype';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { EntityService } from '../entitytype.service';

class MockAnnotationService {
  getAllAnnotations(): Observable<Array<Annotation>> { return new Observable() };
};
class MockEntityService {
  getEntities(): Array<EntityType> {
    return [new EntityType('PT_SKONTO_PERCENT', 'green')];
  }
};

class MockHotkeysService {
  add(hotkey: Hotkey | Hotkey[], specificEvent?: string): Hotkey | Hotkey[] {
    return hotkey;
  }
}


describe('AnnotatorComponent', () => {
  let component: AnnotatorComponent;
  let fixture: ComponentFixture<AnnotatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, MatGridListModule, MatListModule],
      declarations: [EntitytypeListComponent, AnnotatorComponent, AnnotationListComponent],
      providers: [{ provide: AnnotationService, useClass: MockAnnotationService }, { provide: EntityService, useClass: MockEntityService }, { provide: HotkeysService, useClass: MockHotkeysService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
