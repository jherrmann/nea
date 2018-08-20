
export class Annotation {
  id: string;
  text: string;
  tokens: Array<string>;
  annotations: Array<string>;
}
export interface NamedEntity {
  entity: string;
  begin: number;
  end: number;
  value: string;
}

export interface AnnotationSource {
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
