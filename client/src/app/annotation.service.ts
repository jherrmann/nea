import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Annotation, NamedEntity } from './annotation';
import { EntityType } from './entitytype';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {

  private serverUrl = 'api/namedentities';
  constructor(private http: HttpClient) { }

  getAnnotation(id: string): Observable<Annotation> {
    const url = `${this.serverUrl}/${id}`;
    return this.http.get<Annotation>(url).pipe(
      map(result => {
        const anno = new Annotation();
        anno.id = result['_id'];
        anno.text = result['text'];
        anno.tokens = this.tokenize(result['text']);
        // TODO fill correctly
        anno.entities = this.setEntitiesForTokens(anno.tokens, result['named_entities']);
        return anno;
      }),
      catchError(err => { throw Error(err); })
    );
  }
  private tokenize(text: string): Array<string> {
    return text.split(/(\s|\(|\)|\[|\]|%)/g);
  }

  private setEntitiesForTokens(tokens: Array<string>, namedEntities: Array<NamedEntity>) {
    const entities = [];
    if (namedEntities) {
      const nrOfEntites = namedEntities.length;
      let currentEntityIdx = 0;
      // sort so we dont have to scan the named entities
      namedEntities.sort((a, b) => b.value.localeCompare(a.value));
      if (nrOfEntites > 0) {
        let currentStart = 0;
        let currentEnd = 0;
        let currentEntity =  namedEntities[currentEntityIdx];

        for (const element of tokens) {
          currentStart = currentEnd;
          currentEnd += element.length;

          if (currentEntity.begin >= currentStart && currentEntity.end <= currentEnd) {
            // TODO get entitytype from service
            entities.push(new EntityType(currentEntity.entity, 'red'));
            currentEntityIdx++;
            currentEntity = namedEntities[currentEntityIdx];
          } else {
            entities.push(null);
          }
          if (currentEntityIdx === nrOfEntites) {
            break;
          }
        }
      }
    }
    return entities;
  }
}
