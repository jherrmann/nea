import { Injectable } from '@angular/core';
import { EntityType } from './entitytype';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor() { }

  getEntities(): Array<EntityType> {

    const entities = [
      new EntityType('PT_SKONTO_PERCENT', 'green'),
      new EntityType('PT_SKONTO_DUE_DAYS', 'blue')
    ];

    return entities;
  }

}
