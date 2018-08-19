import { Injectable } from '@angular/core';
import { Annotation } from './annotation';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {

  constructor() { }

  getAnnotation(id: number) {
    const anno = new Annotation();
    anno.tokens = Array('Hier', 'steht', 'ganz',  'viel', 'Text', 'den', 'man', 'selektieren', 'kann', '.');
    return anno;
  }
}
