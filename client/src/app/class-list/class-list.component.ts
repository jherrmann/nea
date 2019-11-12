import { Component, OnInit } from '@angular/core';
import { ClassType } from '../classtype';
import { ClasstypeService } from '../classtype.service';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {

  classTypes: Set<ClassType>;
  selectedClassesSet: Set<ClassType> = new Set();

  constructor(private classTypeService: ClasstypeService) { }

  ngOnInit() {
    this.classTypes = this.classTypeService.getClassTypes();
  }

  onSelect(clazz: ClassType, index: number): void {
    if (this.selectedClassesSet.has(clazz)) {
      this.selectedClassesSet.delete(clazz);
    } else {
      this.selectedClassesSet.add(clazz);
    }
  }

  isSelected(clazz: ClassType): boolean {
    return this.selectedClassesSet.has(clazz);
  }

}
