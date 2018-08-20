import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Annotation } from './annotation';

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
        return anno;
      }),
      catchError(err => { throw Error(err); })
    );
  }
  private tokenize(text: string) {
    return text.split(/(\s|\(|\)|\[|\]|%)/g);
  }
}
