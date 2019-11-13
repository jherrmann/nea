import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Annotation, NamedEntity, AnnotationSource } from './annotation';
import { EntityService } from './entitytype.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
    // 'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {

  private serverUrl = 'api/annotations';
  constructor(private http: HttpClient, private entityTypeService: EntityService) { }

  getAnnotation(id: string): Observable<Annotation> {
    const url = `${this.serverUrl}/${id}`;
    return this.http.get<Annotation>(url).pipe(
      map(result => {
        const anno = new Annotation();
        anno.id = result['_id'];
        anno.text = result['text'];
        anno.tokens = this.tokenize(result['text']);
        anno.entities = this.setEntitiesForTokens(anno.tokens, result['named_entities']);
        anno.classes = new Set(result['classes']);
        return anno;
      }),
      catchError(err => { throw Error(err); })
    );
  }

  getAllAnnotations(setNames: Array<string>): Observable<Array<Annotation>> {
    const url = `${this.serverUrl}`;

    // annotation set names are passed to the query param sets as array
    let params = new HttpParams();
    if (setNames) {
      setNames.forEach(setname => {
        params = params.append(`sets[]`, setname);
      });
    }

    return this.http.get<Array<Annotation>>(url, { params: params }).pipe(
      map(result => {
        return result.map(annoSource => {
          const anno = new Annotation();
          anno.id = annoSource['_id'];
          anno.name = annoSource['name'];
          return anno;
        });
      }),
      catchError(err => { throw Error(err); })
    );
  }

  getAnnotationSetNames(): Observable<Array<string>> {
    const url = 'api/annotationsets';
    return this.http.get<Array<string>>(url);
  }

  updateAnnotation(annotation: Annotation): Observable<AnnotationSource> {
    const url = `${this.serverUrl}/${annotation.id}`;
    const annotation_payload = new AnnotationSource();
    annotation_payload.named_entities = this.createNamedEntities(annotation);
    annotation_payload.classes = Array.from(annotation.classes);
    return this.http.put<AnnotationSource>(url, annotation_payload, httpOptions)
      .pipe(
        tap(_ => console.log(`updated annotation id=${annotation.id}`)),
        catchError(err => { throw Error(err); })
      );
  }

  private tokenize(text: string): Array<string> {
    return text.split(/(\s|\.|,|\(|\)|\[|\]|%|-|\/|\\|_|\||\{|\}|:|")/g);
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
        let currentEntity = namedEntities[currentEntityIdx];

        for (const element of tokens) {
          currentStart = currentEnd;
          currentEnd += element.length;
          // console.log(currentStart + ' ' + currentEnd + ' - ' + currentEntity.begin + ' ' + currentEntity.end);
          if (currentStart >= currentEntity.begin && currentEnd <= currentEntity.end) {
            entities.push(this.entityTypeService.getEntityTypeFor(currentEntity.entity));
            // move to next named entity when all his token are exausted
            if (currentEnd === currentEntity.end) {
              currentEntityIdx++;
              currentEntity = namedEntities[currentEntityIdx];
            }
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
    let currentEntity;
    for (let index = 0; index < anno.tokens.length; index++) {
      const token = anno.tokens[index];
      currentStart = currentEnd;
      currentEnd += token.length;
      const entity = anno.entities[index];
      if (entity) {
        if (currentEntity && currentEntity.end === currentStart && currentEntity.entity === entity.name) {
          // append to current named entity
          currentEntity.end = currentEnd;
          currentEntity.value += token;
        } else {
          // TODO there seams to be a case when an empty namend entity is created
          // create new named entity
          const namedEntity = new NamedEntity();
          namedEntity.entity = entity.name;
          namedEntity.begin = currentStart;
          namedEntity.end = currentEnd;
          namedEntity.value = token;
          currentEntity = namedEntity;
          result.push(namedEntity);
        }
      }
    }

    return result;
  }
}
