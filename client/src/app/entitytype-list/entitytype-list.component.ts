import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { EntityService } from '../entitytype.service';
import { EntityType } from '../entitytype';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Component({
  selector: 'app-entitytype-list',
  templateUrl: './entitytype-list.component.html',
  styleUrls: ['./entitytype-list.component.css']
})
export class EntitytypeListComponent implements OnInit {

  entityTypes: Array<EntityType>;
  selectedEntity: EntityType;
  @Output() selectedEntityEvent = new EventEmitter<EntityType>();

  constructor(private entityService: EntityService,
    private _hotkeysService: HotkeysService) { }

  ngOnInit() {
    // load entityTypes
    this.entityTypes = this.entityService.getEntities();
    this.onEntitySelect(this.entityTypes[0]);

    // add hotkeys
    this._hotkeysService.add(new Hotkey('1', (event: KeyboardEvent): boolean => {
      this.onEntitySelect(this.entityTypes[0]);
      return false; // Prevent bubbling
    }));
    this._hotkeysService.add(new Hotkey('2', (event: KeyboardEvent): boolean => {
      this.onEntitySelect(this.entityTypes[1]);
      return false; // Prevent bubbling
    }));
  }

  onEntitySelect(entity: EntityType): void {
    this.selectedEntity = entity;
    // inform parent about selected entity type
    this.selectedEntityEvent.emit(entity);
  }

}
