import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { Annotation, NamedEntity } from './annotation';
import { EntityService } from './entitytype.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
    // 'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {

  private serverUrl = 'api/namedentities';
  constructor(private http: HttpClient, private entityTypeService: EntityService) { }

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

  updateAnnotation (annotation: Annotation): Observable<Array<NamedEntity>> {
    const url = `${this.serverUrl}/${annotation.id}`;
    const entities = this.createNamedEntities(annotation);
    return this.http.put<Array<NamedEntity>>(url, entities, httpOptions)
      .pipe(
        tap(_ => console.log(`updated annotation id=${annotation.id}`)),
        catchError(err => { throw Error(err); })
      );
  }

  private tokenize(text: string): Array<string> {
    return text.split(/(\s|\.|,|\(|\)|\[|\]|%)/g);
  }

  private setEntitiesForTokens(tokens: Array<string>, namedEntities: Array<NamedEntity>) {
    const entities = [];
    if (namedEntities) {
      const nrOfEntites = namedEntities.length;
      let currentEntityIdx = 0;
      // sort so we dont have to scan the named entities
      namedEntities.sort((a, b) => a.begin - b.begin);
      if (nrOfEntites > 0) {
        let currentStart = 0;
        let currentEnd = 0;
        let currentEntity =  namedEntities[currentEntityIdx];

        for (const element of tokens) {
          currentStart = currentEnd;
          currentEnd += element.length;
          // console.log(currentStart + ' ' + currentEnd + ' - ' + currentEntity.begin + ' ' + currentEntity.end);
          if (currentEntity.begin >= currentStart && currentEntity.end <= currentEnd) {
            entities.push(this.entityTypeService.getEntityTypeFor(currentEntity.entity));
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

  private createNamedEntities(anno: Annotation): Array<NamedEntity> {
    const result = [];
    let currentStart = 0;
    let currentEnd = 0;
    for (let index = 0; index < anno.tokens.length; index++) {
      const token = anno.tokens[index];
      currentStart = currentEnd;
      currentEnd += token.length;
      // TODO edge case span multiple token!
      const entity = anno.entities[index];
      if (entity) {
        const namedEntity = new NamedEntity();
        namedEntity.entity = entity.name;
        namedEntity.begin = currentStart;
        namedEntity.end = currentEnd;
        namedEntity.value = token;
        result.push(namedEntity);
      }
    }

    return result;
  }
}
