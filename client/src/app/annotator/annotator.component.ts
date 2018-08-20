import { Component, OnInit } from '@angular/core';
import { AnnotationService } from '../annotation.service';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Component({
  selector: 'app-annotator',
  templateUrl: './annotator.component.html',
  styleUrls: ['./annotator.component.css']
})
export class AnnotatorComponent implements OnInit {

  entityTypes = [{ name: 'SKONTO_PERCENT', color: 'green' }, { name: 'SKONTO_DAYS', color: 'blue' }];
  selectedEntity = this.entityTypes[0];
  documentText = [];
  annotations = [];

  constructor(private annotationService: AnnotationService, private _hotkeysService: HotkeysService) {}

  ngOnInit() {
    this.getAnnotation();
    // add hotkeys
    this._hotkeysService.add(new Hotkey('a', (event: KeyboardEvent): boolean => {
      this.selectedEntity = this.entityTypes[0];
      return false; // Prevent bubbling
    }));
    this._hotkeysService.add(new Hotkey('b', (event: KeyboardEvent): boolean => {
      this.selectedEntity = this.entityTypes[1];
      return false; // Prevent bubbling
  }));
  }

  getAnnotation() {
    this.annotationService.getAnnotation('5b59946547c34d5ac72d7284')
    .subscribe(anno => this.documentText = anno.tokens);
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
      this.annotations[index] = null;
    } else {
      this.annotations[index] = this.selectedEntity;
    }
  }

}
