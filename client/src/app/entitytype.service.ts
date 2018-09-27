import { Injectable } from '@angular/core';
import { EntityType } from './entitytype';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  private entityMap: Map<string, EntityType> = new Map();
  private entities: Array<EntityType>;

  constructor() {
    this.entities = [
      new EntityType('PT_SKONTO_PERCENT', 'green'),
      new EntityType('PT_SKONTO_DUE_DAYS', 'blue'),
      new EntityType('PT_NET_DUE_DAYS', 'yellow'),
      new EntityType('PT_STARTING_POINT', 'orange'),
      new EntityType('PT_LATE_PAY_FEE', 'darkgreen'),
      new EntityType('PT_LATE_PAY_DUE_DAYS', 'gray'),
      new EntityType('RULE', 'orange'),
      new EntityType('BASE', 'darkgreen'),
      new EntityType('CAP', 'gray')
    ];

    this.entities.forEach(element => {
      this.entityMap.set(element.name, element);
    });
  }

  getEntities(): Array<EntityType> {
    return Array.from(this.entityMap.values());
  }

  getEntityTypeFor(entityName: string): EntityType {
    return this.entityMap.get(entityName);
  }

}
