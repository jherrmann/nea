import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ClassType } from '../classtype';
import { ClasstypeService } from '../classtype.service';
import { Annotation } from '../annotation';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnChanges, OnInit {

  classTypes: Set<ClassType>;

  @Input()
  selectedClassesSet: Set<string>;

  constructor(private classTypeService: ClasstypeService) { }

  ngOnInit() {
    this.classTypes = this.classTypeService.getClassTypes();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selectedClassesSet = changes.selectedClassesSet.currentValue;
  }

  onSelect(clazz: ClassType): void {
    if (this.selectedClassesSet.has(clazz.name)) {
      this.selectedClassesSet.delete(clazz.name);
    } else {
      this.selectedClassesSet.add(clazz.name);
    }
  }

  isSelected(clazz: ClassType): boolean {
    return this.selectedClassesSet.has(clazz.name);
  }

}
