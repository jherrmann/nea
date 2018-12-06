import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EntityType } from './entitytype';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  private serverUrl = 'api/entitytypes';
  private entityMap: Map<string, EntityType> = new Map();

  constructor(private http: HttpClient) { }

  getEntities(): Observable<Array<EntityType>> {
    const url = `${this.serverUrl}`;
    return this.http.get<Array<EntityType>>(url).pipe(
      map(result => {
        return result.map(entitytypeSource => {
          const entitytype = new EntityType(entitytypeSource['name'], entitytypeSource['color']);
          return entitytype;
        });
      }),
      tap(entitytypes => entitytypes.forEach(element => {
        this.entityMap.set(element.name, element);
      })),
      catchError(err => { throw Error(err); })
    );
  }

  getEntityTypeFor(entityName: string): EntityType {
    return this.entityMap.get(entityName);
  }
  
  getEntitySetNames(): Observable<Array<string>> {
    const url = 'api/entitysets';
    return this.http.get<Array<string>>(url);
  }

}
