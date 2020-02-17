import { Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { AnnotationService } from '../annotation.service';
import { AnnotationListComponent } from '../annotation-list/annotation-list.component';

import { Annotation } from '../annotation';
import { EntityType } from '../entitytype';

@Component({
  selector: 'app-annotator-editor',
  templateUrl: './annotator-editor.component.html',
  styleUrls: ['./annotator-editor.component.css']
})
export class AnnotatorEditorComponent implements OnInit {

  anno_id: string;
  annotation: Annotation;
  selectedEntity: EntityType;

  @Output() selectedNextAnnoEvent = new EventEmitter<void>();
  @Output() selectedPreviousAnnoEvent = new EventEmitter<void>();

  constructor(private annotationService: AnnotationService) { }

  ngOnInit() {
  }

  onAnnoSelect(annoId: string) {
    if (this.anno_id !== annoId) {
      this.anno_id = annoId;
      // load current annotation
      this.getAnnotation(this.anno_id);
    }
  }

  onEntitySelect(entity: EntityType) {
    this.selectedEntity = entity;
  }

  getAnnotation(id: string): void {
    this.annotationService.getAnnotation(id)
      .subscribe(anno => this.annotation = anno);
  }

  save(): void {
    this.annotationService.updateAnnotation(this.annotation)
    .subscribe(() => console.log('save complete'));
  }

  nextAnno(): void {
    this.selectedNextAnnoEvent.emit();
  }

  previousAnno(): void {
    this.selectedPreviousAnnoEvent.emit();
  }

  calcClass(index: number) {
    const currentEntity = this.annotation.entities[index];
    if (currentEntity) {
      return currentEntity.color + 'Entity';
    } else {
      return 'default';
    }
  }

  toggleTag(index: number) {
    if (this.annotation.entities[index]) {
      this.annotation.entities[index] = null;
    } else {
      this.annotation.entities[index] = this.selectedEntity;
    }
  }

}
