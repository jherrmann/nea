import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ClassType } from './classtype';

@Injectable({
  providedIn: 'root'
})
export class ClasstypeService {

  private serverUrl = "api/classtypes"

  constructor(private http: HttpClient) { }

  getClassTypes(): Observable<Set<ClassType>> {
    let params = new HttpParams();
    // TODO add option to filter by set
    // if(setNames) {
    //   setNames.forEach(setname => {
    //     params = params.append(`sets[]`, setname);
    //   });
    // }

    return this.http.get<Array<ClassType>>(this.serverUrl, { params: params }).pipe(
      map(result => {
        return new Set(result.map(classtypeSource => {
          const classType = new ClassType(classtypeSource['name'], classtypeSource['set']);
          return classType;
        }));
      }),
      catchError(err => { throw Error(err); })
    );
  }
}
