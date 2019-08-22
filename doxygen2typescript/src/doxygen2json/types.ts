import { compoundRefType } from './test2';

export interface doxygen2JsonOptions {
  xml: string;
  debug?: boolean;
  formulas2Svg?: boolean;
  createParentNodes?: boolean
}
interface Described extends Descriptions {
  location?: Location;
  kind: DoxVirtualKind;
  id: string;
  prot: Prot;
  name: string; // compoundname
}
interface Member extends Described {

}
interface Method extends Member {
  params: Param[]
}
interface Param {}
interface Type {
  name:string
  text:string
  // ref: 
}

    // <xsd:attribute name="refid" type="xsd:string" />
    // <xsd:attribute name="compoundref" type="xsd:string" use="optional" />
    // <xsd:attribute name="startline" type="xsd:integer" />
    // <xsd:attribute name="endline" type="xsd:integer" />


export interface descriptionType {
  title?: string;
  para: docParaType[];
  sect1: docSect1Type[];
  internal?: docInternalType;
}
interface Descriptions {
  briefdescription: string;
  detaileddescription: string;
  inbodydescription?: string;
}

export interface CompoundDef extends Described {
  publicTypes?: PublicType[];
  publicAttribs?: Member[]
  publicFuncs?: Method[]
  version: string;
  static: DoxBool;
  title?:string
  basecompoundref?:compoundRefType[]
  derivedcompoundref?: compoundRefType[];
includes?:incType[]
includedby?:incType[]
incdepgraph?:graphType[]
innerdir?:refType[]
innerclass?:refType[]
innernamespace?:refType[]
innergroup?:refType[]
templateparamlist?:templateparamlistType[]
      // <xsd:element name="sectiondef" type="sectiondefType" minOccurs="0" maxOccurs="unbounded" />
      // <xsd:element name="briefdescription" type="descriptionType" minOccurs="0" />
      // <xsd:element name="detaileddescription" type="descriptionType" minOccurs="0" />
      // <xsd:element name="inheritancegraph" type="graphType" minOccurs="0" />
      // <xsd:element name="collaborationgraph" type="graphType" minOccurs="0" />
      // <xsd:element name="programlisting" type="listingType" minOccurs="0" />
      // <xsd:element name="location" type="locationType" minOccurs="0" />
      // <xsd:element name="listofallmembers" type="listofallmembersType" minOccurs="0" />


    // <xsd:attribute name="id" type="xsd:string" />
    // <xsd:attribute name="kind" type="DoxCompoundKind" />
    // <xsd:attribute name="language" type="DoxLanguage" use="optional"/>
    // <xsd:attribute name="prot" type="DoxProtectionKind" />
    // <xsd:attribute name="final" type="DoxBool" use="optional"/>
    // <xsd:attribute name="sealed" type="DoxBool" use="optional"/>
    // <xsd:attribute name="abstract" type="DoxBool" use="optional"/>

}
// interface memberRefType {
//   prot: Prot;
//   refid: string;
//   name: string[]; 
//    scope: string[]
//   virt: DoxVirtualKind;
//   ambiguityscope: string
// }
interface Location {
  "file": string;
  "line": integer;
  "column": integer;
  "bodyfile": string;
  "bodystart": integer;
  "bodyend": integer;
}
export type integer = number
/** The complex <para> structure is serialized to a XML string with some modifications like rendering formulas , transform to markdown etc (optionl) */
export type docParaType = string

type DoxVirtualKind = 'emun' | 'class' | 'function'
type DoxProtectionKind = 'public' | 'protected' | 'private'
interface PublicType extends Described {
  enumValues: {
    initializer: string;
  } & [];
}
