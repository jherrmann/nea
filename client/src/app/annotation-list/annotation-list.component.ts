import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AnnotationService } from '../annotation.service';
import { Annotation, } from '../annotation';

@Component({
  selector: 'app-annotation-list',
  templateUrl: './annotation-list.component.html',
  styleUrls: ['./annotation-list.component.css']
})
export class AnnotationListComponent implements OnInit {

  annos: Array<Annotation>;
  selectedAnno: string;
  @Output() selectedAnnoEvent = new EventEmitter<string>();

  constructor(private annotationService: AnnotationService) { }

  ngOnInit() {
    // load annotations List
    this.annotationService.getAllAnnotations().subscribe(result => this.annos = result);
  }

  onSelect(anno: Annotation): void {
    this.selectedAnno = anno.id;
    // inform parent about selected anno
    this.selectedAnnoEvent.emit(anno.id);
  }

}
