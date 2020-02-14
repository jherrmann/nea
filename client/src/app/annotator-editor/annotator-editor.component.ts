import { Component, OnInit, ViewChild} from '@angular/core';
import { AnnotationService } from '../annotation.service';
import { AnnotationListComponent } from '../annotation-list/annotation-list.component';

import { Annotation } from '../annotation';
import { EntityType } from '../entitytype';

@Component({
  selector: 'app-annotator',
  templateUrl: './annotator.component.html',
  styleUrls: ['./annotator.component.css']
})
export class AnnotatorComponent implements OnInit {

  anno_id: string;
  annotation: Annotation;
  selectedEntity: EntityType;

  @ViewChild(AnnotationListComponent, { static: true })
  private annotationListComponent: AnnotationListComponent;

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
    this.annotationListComponent.next();
  }

  previousAnno(): void {
    this.annotationListComponent.previous();
  }

  calcClass(index) {
    const currentEntity = this.annotation.entities[index];
    if (currentEntity) {
      return currentEntity.color + 'Entity';
    } else {
      return 'default';
    }
  }

  toggleTag(index) {
    if (this.annotation.entities[index]) {
      this.annotation.entities[index] = null;
    } else {
      this.annotation.entities[index] = this.selectedEntity;
    }
  }

}
