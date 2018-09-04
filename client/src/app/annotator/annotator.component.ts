import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { AnnotationService } from '../annotation.service';

import { Annotation } from '../annotation';
import { EntityType } from '../entitytype';

@Component({
  selector: 'app-annotator',
  templateUrl: './annotator.component.html',
  styleUrls: ['./annotator.component.css']
})
export class AnnotatorComponent implements OnInit, OnChanges {

  @Input() anno_id: string;
  annotation: Annotation;
  @Input()
  selectedEntity: EntityType;


  constructor(private annotationService: AnnotationService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['anno_id'] && this.anno_id) {
      // load current annotation
      this.getAnnotation(this.anno_id);
    }
}

  getAnnotation(id: string): void {
    this.annotationService.getAnnotation(id)
      .subscribe(anno => this.annotation = anno);
  }

  save(): void {
    this.annotationService.updateAnnotation(this.annotation)
    .subscribe(() => console.log('save complete'));
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
