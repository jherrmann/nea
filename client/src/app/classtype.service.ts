import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClassType } from './classtype';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClasstypeService {

  private serverUrl = "api/classtypes"
  private classTypes: Set<ClassType>;

  constructor(private http: HttpClient) { }

  getClassTypes(): Set<ClassType> {
    let classes = new Set<ClassType>().add(new ClassType("DISCOUNT_SENT", "PT_DISCOUNT")).add(new ClassType("DISCOUNT_REFERENCE_SENT", "PT_DISCOUNT"));
    return classes;
  }
}
