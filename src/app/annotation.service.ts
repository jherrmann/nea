import { Injectable } from '@angular/core';
import { Annotation } from './annotation';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {

  constructor() { }

  getAnnotation(id: number) {
    const anno = new Annotation();
    // Array('Hier', 'steht', 'ganz',  'viel', 'Text', 'den', 'man', 'selektieren', 'kann', '.');
    anno.text = 'XYZ grants an early payment discount of two percent (2%) when paid until 10 days after receive of the invoice.';
    anno.tokens = this.tokenize(anno.text);
    return anno;
  }
  private tokenize(text: string) {
    return text.split(/(\s|\(|\)|\[|\]|%)/g);
  }
}
