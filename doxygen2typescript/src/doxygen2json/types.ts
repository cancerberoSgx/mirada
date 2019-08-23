import { TODO } from 'misc-utils-of-mine-generic';

// import { compoundRefType } from './test2';

export interface ParseDoxygenOptions {
  xml: string;
  debug?: boolean;
  formulas2Svg?: boolean;
  createParentNodes?: boolean
}
export interface Described extends Descriptions {
  location?: Location;
  // kind: DoxProtectionKind;
  id: string;
  prot: DoxProtectionKind;
  // name: string; // compoundname
}
export interface  linkedTextType {
  name: string
  text: string
    refs: refTextType[];
}
export interface Member extends Described {
//  templateparamlist?: templateparamlistType;
  type?: linkedTextType;
  definition?: string;
  argsstring?: string;
  name: string;
//   read?: any;
//   write?: any;
//   bitfield?: any;
//   reimplementss: reimplementType[];
//   reimplementedbys: reimplementType[];
//   param: paramType[];
//   enumvalues: enumvalueType[];
//   initializer?: linkedTextType;
//   exceptions?: linkedTextType;
//   briefdescription?: descriptionType;
//   detaileddescription?: descriptionType;
//   inbodydescription?: descriptionType;
//   location: locationType;
  references: referenceType[];
  referencedby: referenceType[];

//   readable?: DoxBool
//   writable?: DoxBool
//   initonly?: DoxBool
//   settable?: DoxBool
//   gettable?: DoxBool
//   final?: DoxBool
//   sealed?: DoxBool
//   new?: DoxBool
//   add?: DoxBool
//   remove?: DoxBool
//   raise?: DoxBool
//   optional?: DoxBool
//   required?: DoxBool
//   accessor?: DoxBool
//   attribute?: DoxBool
//   property?: DoxBool
//   readonly?: DoxBool
//   bound?: DoxBool
//   removable?: DoxBool
//   contrained?: DoxBool
//   transient?: DoxBool
//   maybevoid?: DoxBool
//   maybedefault?: DoxBool
//   maybeambiguous?: DoxBool
  kind: DoxMemberKind
//   id: string
//   prot: string
//   static: DoxBool
//   const: DoxBool
//   explicit: DoxBool
//   inline: DoxBool
//   refqual: string
//   virt: string
//   volatile: string
//   mutable: string
}

type referenceType = TODO

export interface Method extends Member {
  params: Param[]
}
export interface Param {
  type: linkedTextType
  // declname: string
  description?: string
  array?:any
  // defname?: string
  name:string
  // defval?: linkedTextType
}
// interface Type {
//   name:string
//   text:string
//   // ref: 
// }

export interface Location {
  file: string;
  line: number;
  column: number;
  bodyfile: string;
  bodystart: number;
  bodyend: number;
}
export interface Descriptions {
  briefdescription: string;
  detaileddescription: string;
  detaileddescriptionNode: Element
  inbodydescription?: string;
}

export interface CompoundDef extends Described {
  publicTypes?: PublicType[];
  publicAttribs?: Member[]
  publicFuncs?: Method[]
  // version: string;
  compoundname: string
  kind: DoxCompoundKind
  static: DoxBool;
  title?:string
  basecompoundref?:compoundRefType[]
  derivedcompoundref?: compoundRefType[];
// includes?:incType[]
// includedby?:incType[]
// incdepgraph?:graphType[]
// innerdir?:refType[]
// innerclass?:refType[]
// innernamespace?:refType[]
// innergroup?:refType[]
// templateparamlist?:templateparamlistType[]


    // <xsd:attribute name="refid" type="xsd:string" />
    // <xsd:attribute name="compoundref" type="xsd:string" use="optional" />
    // <xsd:attribute name="startline" type="xsd:integer" />
    // <xsd:attribute name="endline" type="xsd:integer" />


// export interface descriptionType {
//   title?: string;
//   para: docParaType[];
//   sect1: docSect1Type[];
//   internal?: docInternalType;
// }
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
// export type integer = number
/** The complex <para> structure is serialized to a XML string with some modifications like rendering formulas , transform to markdown etc (optionl) */
// export type docParaType = string

export interface PublicType extends Described {
  kind: DoxSectionKind
  enumValues: {
    initializer: string;
  }[];
}


export type compoundRefType = TODO  

export type incType = string 

export interface refTextType{refid: string, kindref: string, text: string}

export type refType = string  

export type reimplementType = string 

export type DoxBool = "yes" | "no"
export type DoxGraphRelation = "include" | "usage" | "template-instance" | "public-inheritance" | "protected-inheritance" | "private-inheritance" | "type-constraint"
export type DoxRefKind = "compound" | "member"
export type DoxMemberKind = "define" | "property" | "event" | "variable" | "typedef" | "enum" | "function" | "signal" | "prototype" | "friend" | "dcop" | "slot" | "interface" | "service"
export type DoxProtectionKind = "public" | "protected" | "private" | "package"
export type DoxRefQualifierKind = "lvalue" | "rvalue"
export type DoxLanguage = "Unknown" | "IDL" | "Java" | "C#" | "D" | "PHP" | "Objective-C" | "C++" | "Javascript" | "Python" | "Fortran" | "VHDL" | "XML" | "SQL" | "Tcl" | "Markdown"
export type DoxVirtualKind = "non-virtual" | "virtual" | "pure-virtual"
export type DoxCompoundKind = "class" | "struct" | "union" | "interface" | "protocol" | "category" | "exception" | "service" | "singleton" | "module" | "type" | "file" | "namespace" | "group" | "page" | "example" | "dir"
export type DoxSectionKind = "user-defined" | "public-type" | "public-func" | "public-attrib" | "public-slot" | "signal" | "dcop-func" | "property" | "event" | "public-static-func" | "public-static-attrib" | "protected-type" | "protected-func" | "protected-attrib" | "protected-slot" | "protected-static-func" | "protected-static-attrib" | "package-type" | "package-func" | "package-attrib" | "package-static-func" | "package-static-attrib" | "private-type" | "private-func" | "private-attrib" | "private-slot" | "private-static-func" | "private-static-attrib" | "friend" | "related" | "define" | "prototype" | "typedef" | "enum" | "func" | "var"
export type DoxHighlightClass = "comment" | "normal" | "preprocessor" | "keyword" | "keywordtype" | "keywordflow" | "stringliteral" | "charliteral"
export type DoxSimpleSectKind = "see" | "return" | "author" | "authors" | "version" | "since" | "date" | "note" | "warning" | "pre" | "post" | "copyright" | "invariant" | "remark" | "attention" | "par" | "rcs"
export type DoxVersionNumber = string
export type DoxImageKind = "html" | "latex" | "rtf"
export type DoxParamListKind = "param" | "retval" | "exception" | "templateparam"
export type DoxCharRange = string
export type DoxParamDir = "in" | "out" | "inout"
export type DoxAccessor = "retain" | "copy" | "assign" | "weak" | "strong" | "unretained"
