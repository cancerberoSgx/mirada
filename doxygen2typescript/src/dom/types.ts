export interface Options {
  xml: string;
  debug?: boolean;
  formulas2Svg?: boolean;
}
interface Described {
  briefdescription: string;
  detaileddescription: string;
  inbodydescription?: string;
  location?: Location;
  kind: Kind;
  id: string;
  name: string;
}
export interface CompoundDef extends Described {
  prot: Prot;
  publicTypes: PublicType[];
  version: string;
  static: string;
  derivedcompoundref: Derivedcompoundref[];
}
interface Derivedcompoundref {
  prot: Prot;
  refid: string;
  virt: string;
  name: string;
}
interface Location {
  "file": string;
  "line": string;
  "column": string;
  "bodyfile": string;
  "bodystart": string;
  "bodyend": string;
}
type Kind = 'emun' | 'class' | 'function';
type Prot = 'public' | 'protected' | 'private';
interface PublicType extends Described {
  enumValues: {
    initializer: string;
  } & [];
}
