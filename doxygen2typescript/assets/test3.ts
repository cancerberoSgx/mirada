// import { asArray, isArray } from 'misc-utils-of-mine-generic'


// class Text {
//   constructor(p?: any) {

//   }
//   ulink: docURLLink;
//   bold: docMarkupType;
//   emphasis: docMarkupType;
//   computeroutput: docMarkupType;
//   subscript: docMarkupType;
//   superscript: docMarkupType;
//   center: docMarkupType;
//   small: docMarkupType;
//   htmlonly: string;
//   manonly: string;
//   xmlonly: string;
//   rtfonly: string;
//   latexonly: string;
//   dot: string;
//   plantuml: string;
//   anchor: docAnchorType;
//   formula: docFormulaType;
//   ref: docRefTextType;
//   nonbreakablespace: docEmptyType;
//   iexcl: docEmptyType;
//   cent: docEmptyType;
//   pound: docEmptyType;
//   curren: docEmptyType;
//   yen: docEmptyType;
//   brvbar: docEmptyType;
//   sect: docEmptyType;
//   umlaut: docEmptyType;
//   copy: docEmptyType;
//   ordf: docEmptyType;
//   laquo: docEmptyType;
//   not: docEmptyType;
//   shy: docEmptyType;
//   registered: docEmptyType;
//   macr: docEmptyType;
//   deg: docEmptyType;
//   plusmn: docEmptyType;
//   sup2: docEmptyType;
//   sup3: docEmptyType;
//   acute: docEmptyType;
//   micro: docEmptyType;
//   para: docEmptyType;
//   middot: docEmptyType;
//   cedil: docEmptyType;
//   sup1: docEmptyType;
//   ordm: docEmptyType;
//   raquo: docEmptyType;
//   frac14: docEmptyType;
//   frac12: docEmptyType;
//   frac34: docEmptyType;
//   iquest: docEmptyType;
//   Agrave: docEmptyType;
//   Aacute: docEmptyType;
//   Acirc: docEmptyType;
//   Atilde: docEmptyType;
//   Aumlaut: docEmptyType;
//   Aring: docEmptyType;
//   AElig: docEmptyType;
//   Ccedil: docEmptyType;
//   Egrave: docEmptyType;
//   Eacute: docEmptyType;
//   Ecirc: docEmptyType;
//   Eumlaut: docEmptyType;
//   Igrave: docEmptyType;
//   Iacute: docEmptyType;
//   Icirc: docEmptyType;
//   Iumlaut: docEmptyType;
//   ETH: docEmptyType;
//   Ntilde: docEmptyType;
//   Ograve: docEmptyType;
//   Oacute: docEmptyType;
//   Ocirc: docEmptyType;
//   Otilde: docEmptyType;
//   Oumlaut: docEmptyType;
//   times: docEmptyType;
//   Oslash: docEmptyType;
//   Ugrave: docEmptyType;
//   Uacute: docEmptyType;
//   Ucirc: docEmptyType;
//   Uumlaut: docEmptyType;
//   Yacute: docEmptyType;
//   THORN: docEmptyType;
//   szlig: docEmptyType;
//   agrave: docEmptyType;
//   aacute: docEmptyType;
//   acirc: docEmptyType;
//   atilde: docEmptyType;
//   aumlaut: docEmptyType;
//   aring: docEmptyType;
//   aelig: docEmptyType;
//   ccedil: docEmptyType;
//   egrave: docEmptyType;
//   eacute: docEmptyType;
//   ecirc: docEmptyType;
//   eumlaut: docEmptyType;
//   igrave: docEmptyType;
//   iacute: docEmptyType;
//   icirc: docEmptyType;
//   iumlaut: docEmptyType;
//   eth: docEmptyType;
//   ntilde: docEmptyType;
//   ograve: docEmptyType;
//   oacute: docEmptyType;
//   ocirc: docEmptyType;
//   otilde: docEmptyType;
//   oumlaut: docEmptyType;
//   divide: docEmptyType;
//   oslash: docEmptyType;
//   ugrave: docEmptyType;
//   uacute: docEmptyType;
//   ucirc: docEmptyType;
//   uumlaut: docEmptyType;
//   yacute: docEmptyType;
//   thorn: docEmptyType;
//   yumlaut: docEmptyType;
//   fnof: docEmptyType;
//   Alpha: docEmptyType;
//   Beta: docEmptyType;
//   Gamma: docEmptyType;
//   Delta: docEmptyType;
//   Epsilon: docEmptyType;
//   Zeta: docEmptyType;
//   Eta: docEmptyType;
//   Theta: docEmptyType;
//   Iota: docEmptyType;
//   Kappa: docEmptyType;
//   Lambda: docEmptyType;
//   Mu: docEmptyType;
//   Nu: docEmptyType;
//   Xi: docEmptyType;
//   Omicron: docEmptyType;
//   Pi: docEmptyType;
//   Rho: docEmptyType;
//   Sigma: docEmptyType;
//   Tau: docEmptyType;
//   Upsilon: docEmptyType;
//   Phi: docEmptyType;
//   Chi: docEmptyType;
//   Psi: docEmptyType;
//   Omega: docEmptyType;
//   alpha: docEmptyType;
//   beta: docEmptyType;
//   gamma: docEmptyType;
//   delta: docEmptyType;
//   epsilon: docEmptyType;
//   zeta: docEmptyType;
//   eta: docEmptyType;
//   theta: docEmptyType;
//   iota: docEmptyType;
//   kappa: docEmptyType;
//   lambda: docEmptyType;
//   mu: docEmptyType;
//   nu: docEmptyType;
//   xi: docEmptyType;
//   omicron: docEmptyType;
//   pi: docEmptyType;
//   rho: docEmptyType;
//   sigmaf: docEmptyType;
//   sigma: docEmptyType;
//   tau: docEmptyType;
//   upsilon: docEmptyType;
//   phi: docEmptyType;
//   chi: docEmptyType;
//   psi: docEmptyType;
//   omega: docEmptyType;
//   thetasym: docEmptyType;
//   upsih: docEmptyType;
//   piv: docEmptyType;
//   bull: docEmptyType;
//   hellip: docEmptyType;
//   prime: docEmptyType;
//   Prime: docEmptyType;
//   oline: docEmptyType;
//   frasl: docEmptyType;
//   weierp: docEmptyType;
//   imaginary: docEmptyType;
//   real: docEmptyType;
//   trademark: docEmptyType;
//   alefsym: docEmptyType;
//   larr: docEmptyType;
//   uarr: docEmptyType;
//   rarr: docEmptyType;
//   darr: docEmptyType;
//   harr: docEmptyType;
//   crarr: docEmptyType;
//   lArr: docEmptyType;
//   uArr: docEmptyType;
//   rArr: docEmptyType;
//   dArr: docEmptyType;
//   hArr: docEmptyType;
//   forall: docEmptyType;
//   part: docEmptyType;
//   exist: docEmptyType;
//   empty: docEmptyType;
//   nabla: docEmptyType;
//   isin: docEmptyType;
//   notin: docEmptyType;
//   ni: docEmptyType;
//   prod: docEmptyType;
//   sum: docEmptyType;
//   minus: docEmptyType;
//   lowast: docEmptyType;
//   radic: docEmptyType;
//   prop: docEmptyType;
//   infin: docEmptyType;
//   ang: docEmptyType;
//   and: docEmptyType;
//   or: docEmptyType;
//   cap: docEmptyType;
//   cup: docEmptyType;
//   int: docEmptyType;
//   there4: docEmptyType;
//   sim: docEmptyType;
//   cong: docEmptyType;
//   asymp: docEmptyType;
//   ne: docEmptyType;
//   equiv: docEmptyType;
//   le: docEmptyType;
//   ge: docEmptyType;
//   sub: docEmptyType;
//   sup: docEmptyType;
//   nsub: docEmptyType;
//   sube: docEmptyType;
//   supe: docEmptyType;
//   oplus: docEmptyType;
//   otimes: docEmptyType;
//   perp: docEmptyType;
//   sdot: docEmptyType;
//   lceil: docEmptyType;
//   rceil: docEmptyType;
//   lfloor: docEmptyType;
//   rfloor: docEmptyType;
//   lang: docEmptyType;
//   rang: docEmptyType;
//   loz: docEmptyType;
//   spades: docEmptyType;
//   clubs: docEmptyType;
//   hearts: docEmptyType;
//   diams: docEmptyType;
//   OElig: docEmptyType;
//   oelig: docEmptyType;
//   Scaron: docEmptyType;
//   scaron: docEmptyType;
//   Yumlaut: docEmptyType;
//   circ: docEmptyType;
//   tilde: docEmptyType;
//   ensp: docEmptyType;
//   emsp: docEmptyType;
//   thinsp: docEmptyType;
//   zwnj: docEmptyType;
//   zwj: docEmptyType;
//   lrm: docEmptyType;
//   rlm: docEmptyType;
//   ndash: docEmptyType;
//   mdash: docEmptyType;
//   lsquo: docEmptyType;
//   rsquo: docEmptyType;
//   sbquo: docEmptyType;
//   ldquo: docEmptyType;
//   rdquo: docEmptyType;
//   bdquo: docEmptyType;
//   dagger: docEmptyType;
//   Dagger: docEmptyType;
//   permil: docEmptyType;
//   lsaquo: docEmptyType;
//   rsaquo: docEmptyType;
//   euro: docEmptyType;
//   tm: docEmptyType;
// }



// export interface docURLLink extends Text {

// }


// export interface docRefTextType extends Text {

// }

// export type DoxBool = "yes" | "no"
// export type DoxGraphRelation = "include" | "usage" | "template-instance" | "public-inheritance" | "protected-inheritance" | "private-inheritance" | "type-constraint"
// export type DoxRefKind = "compound" | "member"
// export type DoxMemberKind = "define" | "property" | "event" | "variable" | "typedef" | "enum" | "function" | "signal" | "prototype" | "friend" | "dcop" | "slot" | "interface" | "service"
// export type DoxProtectionKind = "public" | "protected" | "private" | "package"
// export type DoxRefQualifierKind = "lvalue" | "rvalue"
// export type DoxLanguage = "Unknown" | "IDL" | "Java" | "C#" | "D" | "PHP" | "Objective-C" | "C++" | "Javascript" | "Python" | "Fortran" | "VHDL" | "XML" | "SQL" | "Tcl" | "Markdown"
// export type DoxVirtualKind = "non-virtual" | "virtual" | "pure-virtual"
// export type DoxCompoundKind = "class" | "struct" | "union" | "interface" | "protocol" | "category" | "exception" | "service" | "singleton" | "module" | "type" | "file" | "namespace" | "group" | "page" | "example" | "dir"
// export type DoxSectionKind = "user-defined" | "public-type" | "public-func" | "public-attrib" | "public-slot" | "signal" | "dcop-func" | "property" | "event" | "public-static-func" | "public-static-attrib" | "protected-type" | "protected-func" | "protected-attrib" | "protected-slot" | "protected-static-func" | "protected-static-attrib" | "package-type" | "package-func" | "package-attrib" | "package-static-func" | "package-static-attrib" | "private-type" | "private-func" | "private-attrib" | "private-slot" | "private-static-func" | "private-static-attrib" | "friend" | "related" | "define" | "prototype" | "typedef" | "enum" | "func" | "var"
// export type DoxHighlightClass = "comment" | "normal" | "preprocessor" | "keyword" | "keywordtype" | "keywordflow" | "stringliteral" | "charliteral"
// export type DoxSimpleSectKind = "see" | "return" | "author" | "authors" | "version" | "since" | "date" | "note" | "warning" | "pre" | "post" | "copyright" | "invariant" | "remark" | "attention" | "par" | "rcs"
// export type DoxVersionNumber = string
// export type DoxImageKind = "html" | "latex" | "rtf"
// export type DoxParamListKind = "param" | "retval" | "exception" | "templateparam"
// export type DoxCharRange = string
// export type DoxParamDir = "in" | "out" | "inout"
// export type DoxAccessor = "retain" | "copy" | "assign" | "weak" | "strong" | "unretained"



// export interface childnodeType {
//   edgelabels: any[];

// }
// export interface codelineType {
//   highlights: highlightType[];

// }
// export interface compounddefType {
//   id: string
//   kind: string
//   compoundname: string;
//   title?: string;
//   basecompoundrefs: compoundRefType[];
//   derivedcompoundrefs: compoundRefType[];
//   includess: incType[];
//   includedbys: incType[];
//   incdepgraph?: graphType;
//   invincdepgraph?: graphType;
//   innerdirs: refType[];
//   innerfiles: refType[];
//   innerclasss: refType[];
//   innernamespaces: refType[];
//   innerpages: refType[];
//   innergroups: refType[];
//   templateparamlist?: templateparamlistType;
//   sectiondefs: sectiondefType[];
//   briefdescription?: descriptionType;
//   detaileddescription?: descriptionType;
//   inheritancegraph?: graphType;
//   collaborationgraph?: graphType;
//   programlisting?: listingType;
//   location?: locationType;
//   listofallmembers?: listofallmembersType;
// }
// export interface descriptionType {
//   title?: string;
//   para: docParaType[];
//   sect1: docSect1Type[];
//   internal?: docInternalType;


// }

// export interface docAnchorType {
// }
// export interface docBlockQuoteType {
//   para: docParaType[];
// }
// export interface docCaptionType extends Text {}
// export interface docCopyType {
//   para: docParaType[];
//   sect1: docSect1Type[];
//   internal?: docInternalType;
// }
// export interface docEmptyType {
// }
// export interface docEntryType {
//   para: docParaType[];
// }
// export interface docFileType extends Text {
// }
// export interface docFormulaType {
// }
// export interface docHeadingType extends Text {
// }
// export interface docImageType {
// }
// export interface docIndexEntryType {
//   primaryie: string;
//   secondaryie: string;
// }
// export interface docInternalS1Type {
//   para: docParaType[];
//   sect2s: docSect2Type[];
// }
// export interface docInternalS2Type {
//   para: docParaType[];
//   sect3s: docSect3Type[];
// }
// export interface docInternalS3Type {
//   para: docParaType[];
//   sect3s: docSect4Type[];
// }
// export interface docInternalS4Type {
//   para: docParaType[];
// }
// export interface docInternalType {
//   para: docParaType[];
//   sect1: docSect1Type[];
// }
// export interface docLanguageType {
//   para: docParaType[];
// }
// export interface docListItemType {
//   para: docParaType[];
// }
// export interface docListType {
//   listitems: docListItemType[];
// }
// export interface docMarkupType extends Text {
// }
// export interface docParamListItem {
//   parameternamelists: docParamNameList[];
//   parameterdescription: descriptionType;

// }
// export interface docParamListType {
//   parameteritems: docParamListItem[];

// }
// export interface docParamName {
//   ref?: refTextType;

// }
// export interface docParamNameList {
//   parametertypes: docParamType[];
//   parameternames: docParamName[];

// }
// export interface docParamType {
//   ref?: refTextType;

//   preformatted: docMarkupType;
//   programlisting: listingType;
//   verbatim: string;
//   indexentry: docIndexEntryType;
//   orderedlist: docListType;
//   itemizedlist: docListType;
//   simplesect: docSimpleSectType;
//   title: docTitleType;
//   variablelist: docVariableListType;
//   table: docTableType;
// }
// export interface docParaType extends Text {
//   linebreak: docEmptyType;
//   hruler: docEmptyType;
//   preformatted: docMarkupType;
//   programlisting: listingType;
//   verbatim: string;
//   indexentry: docIndexEntryType;
//   orderedlist: docListType;
//   itemizedlist: docListType;
//   simplesect: docSimpleSectType;
//   title: docTitleType;
//   variablelist: docVariableListType;
//   table: docTableType;
//   heading: docHeadingType;
//   image: docImageType;
//   dotfile: docFileType;
//   mscfile: docFileType;
//   diafile: docFileType;
//   toclist: docTocListType;
//   language: docLanguageType;
//   parameterlist: docParamListType;
//   xrefsect: docXRefSectType;
//   copydoc: docCopyType;
//   blockquote: docBlockQuoteType;
//   parblock: docParBlockType;
//   _: string
//   }
// export interface docParBlockType {
//   para: docParaType[];
// }

// export interface docTocListType {
//   tocitems: docTocItemType[];
// }
// export interface docRowType {
//   entrys: docEntryType[];
// }
// export interface docSect1Type {
//   title: string;
//   para: docParaType[];
//   sect2s: docSect2Type[];
//   internal?: docInternalS1Type;

// }
// export interface docSect2Type {
//   title: string;
//   para: docParaType[];
//   sect3s: docSect3Type[];
//   internal?: docInternalS2Type;

// }
// export interface docSect3Type {
//   title: string;
//   para: docParaType[];
//   sect4s: docSect4Type[];
//   internal?: docInternalS3Type;

// }
// export interface docSect4Type {
//   title: string;
//   para: docParaType[];
//   internal?: docInternalS4Type;
// }
// export interface docSimpleSectType {
//   title?: docTitleType;
//   para: docParaType[];
// }
// export interface docTableType {
//   rows: docRowType[];
//   caption?: docCaptionType;

// }
// export interface docTitleType extends Text {

// }
// export interface docTocItemType extends Text {
// }
// export interface docVariableListType {
//   varlistentry: docVarListEntryType;
//   listitem: docListItemType;

// }
// export interface docVarListEntryType {
//   term: docTitleType;
// }
// export interface docXRefSectType {
//   xreftitles: string[];
//   xrefdescription: descriptionType;
// }
// export interface DoxygenType {
//   compounddef?: compounddefType;
// }
// export interface enumvalueType {
//   name: any;
//   initializer?: linkedTextType;
//   briefdescription?: descriptionType;
//   detaileddescription?: descriptionType;
// }
// export interface graphType {
//   nodes: nodeType[];

// }
// export interface highlightType {
//   sp: any;
//   ref: refTextType;

// }
// export interface linkedTextType {
//   refs: refTextType[];
// }
// export interface linkType {
// }
// export interface listingType {
//   codelines: codelineType[];

// }
// export interface listofallmembersType {
//   members: memberRefType[];

// }

// export interface locationType {
// }

// export interface memberdefType {
//   templateparamlist?: templateparamlistType;
//   type?: linkedTextType;
//   definition?: string;
//   argsstring?: string;
//   name: string;
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
//   referencess: referenceType[];
//   referencedbys: referenceType[];

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
//   kind: string
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

// }

// export interface memberRefType {
//   scope: any;
//   name: any;
 
// }
// export interface nodeType {
//   label: any;
//   link?: linkType;
//   childnodes: childnodeType[];
//  }

// export interface paramType {
//   type?: linkedTextType;
//   declname?: any;
//   defname?: any;
//   array?: any;
//   defval?: linkedTextType;
//   typeconstraint?: linkedTextType;
//   briefdescription?: descriptionType;
 
// }

// export interface referenceType {
 
// } 
// export interface sectiondefType {
//   header?: string;
//   description?: descriptionType;
//   memberdefs: memberdefType[];
//   kind: string 
// }

// export interface templateparamlistType {
//   params: paramType[];
 
// }

// export type compoundRefType = string  

// export type incType = string 

// export type refTextType = string  
// export type refType = string  

// export type reimplementType = string 






