import { EntityType } from './entitytype';
import { ClassType } from './classtype';

export class Annotation {
  id: string;
  text: string;
  name: string;
  tokens: Array<string>;
  entities: Array<EntityType>;
  classes: Array<ClassType>;
}
export class NamedEntity {
  entity: string;
  begin: number;
  end: number;
  value: string;
}

export class AnnotationSource {
  _id: string;
  text: string;
  job: string;
  created_by: string;
  created_date: Date;
  last_modified_by: string;
  last_modified_date: Date;
  anno_set_name: string;
  name: string;
  named_entities: NamedEntity[];
  classes: string[]
}
