import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-annotation-list',
  templateUrl: './annotation-list.component.html',
  styleUrls: ['./annotation-list.component.css']
})
export class AnnotationListComponent implements OnInit {

  annos = [{ name: 'test', id: '5b59946547c34d5ac72d7284' }];
  selectedAnno;
  constructor() { }

  ngOnInit() {
  }

  onSelect(anno): void {
    this.selectedAnno = anno;
  }

}
