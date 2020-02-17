import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotatorViewComponent } from './annotator-view.component';

describe('AnnotatorViewComponent', () => {
  let component: AnnotatorViewComponent;
  let fixture: ComponentFixture<AnnotatorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotatorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotatorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
