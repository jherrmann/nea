import { Injectable } from '@angular/core';
import { Entity } from './entity';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor() { }

  getEntities(): Array<Entity> {

    const entities = [
      new Entity('PT_SKONTO_PERCENT', 'green'),
      new Entity('PT_SKONTO_DUE_DAYS', 'blue')
    ];

    return entities;
  }

}
