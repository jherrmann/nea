import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-annotator',
  templateUrl: './annotator.component.html',
  styleUrls: ['./annotator.component.css']
})
export class AnnotatorComponent implements OnInit {

  selectedText = '';
  documentText = Array('Hier', 'steht', 'ganz',  'viel', 'Text', 'den', 'man', 'selektieren', 'kann', '.');
  annotations = [];

  constructor() { }

  ngOnInit() {
  }

  calcClass(index) {
    if (this.annotations[index]) {
      return 'redEntity';
    } else {
      return 'default';
    }
  }

  toggleTag(index) {
    if (this.annotations[index]) {
      this.selectedText = '';
      this.annotations[index] = 0;
    } else {
      this.selectedText = this.documentText[index];
      this.annotations[index] = 1;
    }
  }

}
