import { Component, OnInit } from '@angular/core';
import { AnnotationService } from '../annotation.service';
import { EntityService } from '../entitytype.service';
import { Annotation, } from '../annotation';
import { EntityType } from '../entitytype';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Component({
  selector: 'app-annotation-list',
  templateUrl: './annotation-list.component.html',
  styleUrls: ['./annotation-list.component.css']
})
export class AnnotationListComponent implements OnInit {

  annos: Array<Annotation>
  selectedAnno: string;
  private entityTypes: Array<EntityType>;
  private selectedEntity: EntityType;

  constructor(private annotationService: AnnotationService, private entityService: EntityService,
    private _hotkeysService: HotkeysService) { }

  ngOnInit() {
    // load annotations List
    this.annotationService.getAllAnnotations().subscribe(result => this.annos = result);

    // load entityTypes
    this.entityTypes = this.entityService.getEntities();
    this.selectedEntity = this.entityTypes[0];


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

  onSelect(anno: Annotation): void {
    this.selectedAnno = anno.id;
  }

}
