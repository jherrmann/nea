import { Injectable } from '@angular/core';
import { EntityType } from './entitytype';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  private entityMap: Map<string, EntityType> = new Map();

  constructor() {
    this.entityMap.set('PT_SKONTO_PERCENT', new EntityType('PT_SKONTO_PERCENT', 'green'));
    this.entityMap.set('PT_SKONTO_DUE_DAYS', new EntityType('PT_SKONTO_DUE_DAYS', 'blue'));
  }

  getEntities(): Array<EntityType> {

    const entities = [
      new EntityType('PT_SKONTO_PERCENT', 'green'),
      new EntityType('PT_SKONTO_DUE_DAYS', 'blue')
    ];

    return Array.from(this.entityMap.values());
  }

  getEntityTypeFor(entityName: string): EntityType {
    return this.entityMap.get(entityName);
  }

}
