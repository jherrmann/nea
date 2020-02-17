import { Component, OnInit, ViewChild } from '@angular/core';
import { EntityType } from '../entitytype';
import { AnnotatorEditorComponent } from '../annotator-editor/annotator-editor.component';
import { AnnotationListComponent } from '../annotation-list/annotation-list.component';

@Component({
  selector: 'app-annotator-view',
  templateUrl: './annotator-view.component.html',
  styleUrls: ['./annotator-view.component.css']
})
export class AnnotatorViewComponent implements OnInit {

  @ViewChild(AnnotatorEditorComponent, { static: true })
  private annotationEditorComponent: AnnotatorEditorComponent;

  @ViewChild(AnnotationListComponent, { static: true })
  private annotationListComponent: AnnotationListComponent;

  constructor() { }

  ngOnInit(): void {
  }

  onAnnoSelect(annoId: string) {
    this.annotationEditorComponent.onAnnoSelect(annoId);
  }

  onEntitySelect(entity: EntityType) {
    this.annotationEditorComponent.onEntitySelect(entity);
  }

  nextAnno(): void {
    this.annotationListComponent.next();
  }

  previousAnno(): void {
    this.annotationListComponent.previous();
  }

}
