import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EntityService } from '../entitytype.service';
import { EntityType } from '../entitytype';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Component({
  selector: 'app-entitytype-list',
  templateUrl: './entitytype-list.component.html',
  styleUrls: ['./entitytype-list.component.css']
})
export class EntitytypeListComponent implements OnInit {

  private hotKeyMax = 9;
  entityTypes: Array<EntityType>;
  selectedEntity: EntityType;
  @Output() selectedEntityEvent = new EventEmitter<EntityType>();
  entitySetList: Array<string> =  [];
  selectedEntitySet: Array<string> = [];

  constructor(private entityService: EntityService,
    private _hotkeysService: HotkeysService) { }

  ngOnInit() {
    // load entityTypes
    this.entityService.getEntities().subscribe(result => {
      this.entityTypes = result;
      this.onEntitySelect(this.entityTypes[0]);
      this.addHotkeys();
    });
    // load entitySetNames
    this.entityService.getEntitySetNames().subscribe(result => {
      this.entitySetList = result;
    });
  }

  addHotkeys() {
    let hotkey = 1;
    while (this.entityTypes.length >= hotkey && hotkey <= this.hotKeyMax) {
      const entityKey = hotkey - 1;
      this._hotkeysService.add(new Hotkey(hotkey.toString(), (event: KeyboardEvent): boolean => {
        this.onEntitySelect(this.entityTypes[entityKey]);
        return false; // Prevent bubbling
      }));
      hotkey++;
    }
  }

  onEntitySelect(entity: EntityType): void {
    this.selectedEntity = entity;
    // inform parent about selected entity type
    this.selectedEntityEvent.emit(entity);

  }

  onChangeEntitySet(newValue): void {
    this.selectedEntitySet = newValue;
  }

}
