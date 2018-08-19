import { Component, OnInit } from '@angular/core';
import { AnnotationService } from '../annotation.service';

@Component({
  selector: 'app-annotator',
  templateUrl: './annotator.component.html',
  styleUrls: ['./annotator.component.css']
})
export class AnnotatorComponent implements OnInit {

  entityTypes = [{ name: 'SKONTO_PERCENT', color: 'green' }, { name: 'SKONTO_DAYS', color: 'blue' }];
  selectedEntity = this.entityTypes[0];
  selectedText = '';
  documentText;
  annotations = [];

  constructor(private annotationService: AnnotationService) { }

  ngOnInit() {
    this.getAnnotation();
  }

  getAnnotation() {
    const anno = this.annotationService.getAnnotation(123);
    this.documentText = anno.tokens;
  }

  calcClass(index) {
    const currentAnno = this.annotations[index];
    if (currentAnno) {
      return currentAnno.color + 'Entity';
    } else {
      return 'default';
    }
  }

  toggleTag(index) {
    if (this.annotations[index]) {
      this.selectedText = '';
      this.annotations[index] = null;
    } else {
      this.selectedText = this.documentText[index];
      this.annotations[index] = this.selectedEntity;
    }
  }

}
