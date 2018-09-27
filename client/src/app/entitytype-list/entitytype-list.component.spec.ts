import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitytypeListComponent } from './entitytype-list.component';

describe('EntitytypeListComponent', () => {
  let component: EntitytypeListComponent;
  let fixture: ComponentFixture<EntitytypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitytypeListComponent ]
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
