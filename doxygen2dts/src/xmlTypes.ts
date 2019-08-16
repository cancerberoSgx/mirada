var xmlTypes;
export interface ParsedDef {
  name: string;
  kind: "class" | 'struct' | 'union';
  extends: ParsedRef;
  public: boolean;
  data: ParsedDefData[];
}
interface ParsedRef {
  name: string;
  ref: string;
}
interface ParsedDefData {
  id: string;
  language: string
  kind: string;
  prot: "public" | 'protected' | 'private';
  'xmlns:xsi': string;
}
