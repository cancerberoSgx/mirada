let astTypes;
export interface Class extends Node {
  methods: Method[];
  attributes: Attribute[];
}
interface Method extends Member {
  params: Param[];
}
interface Attribute extends Member {
}
interface Type extends Node {
}
interface Param extends Node {
  type: Type;
}
interface Member extends Node {
  static: boolean;
  public: boolean;
  type: Type;
}
interface Node {
  name: string;
  description: string;
  id: string;
}
