

export interface CompoundDef extends Described {
  publicTypes?: PublicType[];
  publicAttribs?: Member[]
  publicFuncs?: Method[]
  compoundname: string
  kind: DoxCompoundKind
  title?: string
  basecompoundref?: compoundRefType[]
  derivedcompoundref?: compoundRefType[];
}

export interface PublicType extends Described {
  kind: DoxSectionKind
  enumValues: PublicTypeEnumValue[];
}
export interface PublicTypeEnumValue extends Described {
    initializer: string
    name:string
}
export interface Described extends Descriptions {
  location?: Location;
  id: string;
  prot: DoxProtectionKind;
}

export interface linkedTextType {
  name: string
  text: string
  refs: refTextType[];
}

export interface Member extends Described {
  type?: linkedTextType;
  definition?: string;
  argsstring?: string;
  name: string;
 static: DoxBool, 
 prot: DoxProtectionKind, 
  mutable: DoxBool,
   implicit: DoxBool, 
  inline: DoxBool, 
  const: DoxBool,
   version: DoxBool, 
  kind: DoxMemberKind
}

export interface Method extends Member {
  params: Param[]
}

export interface Param {
  type: linkedTextType
  description?: string
  array?: any
  name: string
}

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

export interface compoundRefType extends refTypeBase {
  prot: DoxProtectionKind
  virt: DoxVirtualKind
}

interface refTypeBase {
  refid: string,
  text: string
}

export interface refTextType extends refTypeBase {
  kindref: DoxRefKind,
}

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
