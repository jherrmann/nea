import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { Observable } from 'rxjs';
import { EntityType } from '../entitytype';
import { EntityService } from '../entitytype.service';
import { EntitytypeListComponent } from './entitytype-list.component';


class MockEntityService {
  getEntities(setNames: Array<string>): Observable<Array<EntityType>> { return new Observable() };
  getEntitySetNames(): Observable<Array<string>> { return new Observable() };
};

class MockHotkeysService {
  add(hotkey: Hotkey | Hotkey[], specificEvent?: string): Hotkey | Hotkey[] {
    return hotkey;
  }
}

describe('EntitytypeListComponent', () => {
  let component: EntitytypeListComponent;
  let fixture: ComponentFixture<EntitytypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatListModule, MatSelectModule, NoopAnimationsModule],
      declarations: [EntitytypeListComponent],
      providers: [{ provide: EntityService, useClass: MockEntityService }, { provide: HotkeysService, useClass: MockHotkeysService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitytypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
