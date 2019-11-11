import { Component, OnInit } from '@angular/core';
import { ClassType } from '../classtype';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {

  classTypes: Set<ClassType>;
  selectedClassesSet: Set<ClassType> = new Set;

  constructor() { }

  ngOnInit() {
    this.classTypes = new Set<ClassType>().add(new ClassType("discount", "green")).add(new ClassType("discount_hint","lightgreen"));
  }

  onSelect(clazz: ClassType, index: number): void {
    if(this.selectedClassesSet.has(clazz)) {
      this.selectedClassesSet.delete(clazz);
    } else {
      this.selectedClassesSet.add(clazz);
    }
  }

  isSelected(clazz: ClassType): boolean {
    return this.selectedClassesSet.has(clazz);
  }

}
