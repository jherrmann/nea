import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AnnotationService } from '../annotation.service';
import { Annotation } from '../annotation';

@Component({
  selector: 'app-annotation-list',
  templateUrl: './annotation-list.component.html',
  styleUrls: ['./annotation-list.component.css']
})
export class AnnotationListComponent implements OnInit {

  annos: Array<Annotation>;
  selectedAnno: string;
  selectedAnnoIndex: number;
  @Output() selectedAnnoEvent = new EventEmitter<string>();

  constructor(private annotationService: AnnotationService) { }

  ngOnInit() {
    // load annotations List
    this.annotationService.getAllAnnotations().subscribe(result => this.annos = result);
  }

  onSelect(anno: Annotation, index: number): void {
    this.selectedAnno = anno.id;
    this.selectedAnnoIndex = index;
    // inform parent about selected anno
    this.selectedAnnoEvent.emit(anno.id);
  }

  next(): void {
    if (this.annos.length > this.selectedAnnoIndex + 1) {
      this.onSelect(this.annos[this.selectedAnnoIndex + 1], this.selectedAnnoIndex + 1);
    }
  }

  previous(): void {
    if (this.selectedAnnoIndex - 1 >= 0 && this.annos.length > this.selectedAnnoIndex - 1) {
      this.onSelect(this.annos[this.selectedAnnoIndex - 1], this.selectedAnnoIndex - 1);
      console.log('move to previous');
    }
  }

}
