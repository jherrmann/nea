import { EntityType } from './entitytype';

export class Annotation {
  id: string;
  text: string;
  tokens: Array<string>;
  entities: Array<EntityType>;
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
  named_entities: NamedEntity[];
}
