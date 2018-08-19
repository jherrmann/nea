import { Component, OnInit } from '@angular/core';
import { AnnotationService } from '../annotation.service';

@Component({
  selector: 'app-annotator',
  templateUrl: './annotator.component.html',
  styleUrls: ['./annotator.component.css']
})
export class AnnotatorComponent implements OnInit {

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
    if (this.annotations[index]) {
      return 'redEntity';
    } else {
      return 'default';
    }
  }

  toggleTag(index) {
    if (this.annotations[index]) {
      this.selectedText = '';
      this.annotations[index] = 0;
    } else {
      this.selectedText = this.documentText[index];
      this.annotations[index] = 1;
    }
  }

}
