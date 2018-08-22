import { Component, OnInit } from '@angular/core';
import { AnnotationService } from '../annotation.service';
import { EntityService } from '../entitytype.service';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { Annotation } from '../annotation';
import { EntityType } from '../entitytype';

@Component({
  selector: 'app-annotator',
  templateUrl: './annotator.component.html',
  styleUrls: ['./annotator.component.css']
})
export class AnnotatorComponent implements OnInit {

  private entityTypes: Array<EntityType>;
  private annotation: Annotation;
  private selectedEntity: EntityType;


  constructor(private annotationService: AnnotationService, private _hotkeysService: HotkeysService,
  private entityService: EntityService) { }

  ngOnInit() {
    // load entityTypes
    this.entityTypes = this.entityService.getEntities();
    this.selectedEntity = this.entityTypes[0];
    // load current annotation
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
