import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitytypeListComponent } from './entitytype-list.component';
import { EntityService } from '../entitytype.service';
import { EntityType } from '../entitytype';
import { MatListModule } from '@angular/material/list';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

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

describe('EntitytypeListComponent', () => {
  let component: EntitytypeListComponent;
  let fixture: ComponentFixture<EntitytypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatListModule],
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
