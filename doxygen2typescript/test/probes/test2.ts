import { asArray, isArray } from 'misc-utils-of-mine-generic'


class Text {
  constructor(p?: any) {

  }
  public ulink: docURLLink;
  public bold: docMarkupType;
  public emphasis: docMarkupType;
  public computeroutput: docMarkupType;
  public subscript: docMarkupType;
  public superscript: docMarkupType;
  public center: docMarkupType;
  public small: docMarkupType;
  public htmlonly: string;
  public manonly: string;
  public xmlonly: string;
  public rtfonly: string;
  public latexonly: string;
  public dot: string;
  public plantuml: string;
  public anchor: docAnchorType;
  public formula: docFormulaType;
  public ref: docRefTextType;
  public nonbreakablespace: docEmptyType;
  public iexcl: docEmptyType;
  public cent: docEmptyType;
  public pound: docEmptyType;
  public curren: docEmptyType;
  public yen: docEmptyType;
  public brvbar: docEmptyType;
  public sect: docEmptyType;
  public umlaut: docEmptyType;
  public copy: docEmptyType;
  public ordf: docEmptyType;
  public laquo: docEmptyType;
  public not: docEmptyType;
  public shy: docEmptyType;
  public registered: docEmptyType;
  public macr: docEmptyType;
  public deg: docEmptyType;
  public plusmn: docEmptyType;
  public sup2: docEmptyType;
  public sup3: docEmptyType;
  public acute: docEmptyType;
  public micro: docEmptyType;
  public para: docEmptyType;
  public middot: docEmptyType;
  public cedil: docEmptyType;
  public sup1: docEmptyType;
  public ordm: docEmptyType;
  public raquo: docEmptyType;
  public frac14: docEmptyType;
  public frac12: docEmptyType;
  public frac34: docEmptyType;
  public iquest: docEmptyType;
  public Agrave: docEmptyType;
  public Aacute: docEmptyType;
  public Acirc: docEmptyType;
  public Atilde: docEmptyType;
  public Aumlaut: docEmptyType;
  public Aring: docEmptyType;
  public AElig: docEmptyType;
  public Ccedil: docEmptyType;
  public Egrave: docEmptyType;
  public Eacute: docEmptyType;
  public Ecirc: docEmptyType;
  public Eumlaut: docEmptyType;
  public Igrave: docEmptyType;
  public Iacute: docEmptyType;
  public Icirc: docEmptyType;
  public Iumlaut: docEmptyType;
  public ETH: docEmptyType;
  public Ntilde: docEmptyType;
  public Ograve: docEmptyType;
  public Oacute: docEmptyType;
  public Ocirc: docEmptyType;
  public Otilde: docEmptyType;
  public Oumlaut: docEmptyType;
  public times: docEmptyType;
  public Oslash: docEmptyType;
  public Ugrave: docEmptyType;
  public Uacute: docEmptyType;
  public Ucirc: docEmptyType;
  public Uumlaut: docEmptyType;
  public Yacute: docEmptyType;
  public THORN: docEmptyType;
  public szlig: docEmptyType;
  public agrave: docEmptyType;
  public aacute: docEmptyType;
  public acirc: docEmptyType;
  public atilde: docEmptyType;
  public aumlaut: docEmptyType;
  public aring: docEmptyType;
  public aelig: docEmptyType;
  public ccedil: docEmptyType;
  public egrave: docEmptyType;
  public eacute: docEmptyType;
  public ecirc: docEmptyType;
  public eumlaut: docEmptyType;
  public igrave: docEmptyType;
  public iacute: docEmptyType;
  public icirc: docEmptyType;
  public iumlaut: docEmptyType;
  public eth: docEmptyType;
  public ntilde: docEmptyType;
  public ograve: docEmptyType;
  public oacute: docEmptyType;
  public ocirc: docEmptyType;
  public otilde: docEmptyType;
  public oumlaut: docEmptyType;
  public divide: docEmptyType;
  public oslash: docEmptyType;
  public ugrave: docEmptyType;
  public uacute: docEmptyType;
  public ucirc: docEmptyType;
  public uumlaut: docEmptyType;
  public yacute: docEmptyType;
  public thorn: docEmptyType;
  public yumlaut: docEmptyType;
  public fnof: docEmptyType;
  public Alpha: docEmptyType;
  public Beta: docEmptyType;
  public Gamma: docEmptyType;
  public Delta: docEmptyType;
  public Epsilon: docEmptyType;
  public Zeta: docEmptyType;
  public Eta: docEmptyType;
  public Theta: docEmptyType;
  public Iota: docEmptyType;
  public Kappa: docEmptyType;
  public Lambda: docEmptyType;
  public Mu: docEmptyType;
  public Nu: docEmptyType;
  public Xi: docEmptyType;
  public Omicron: docEmptyType;
  public Pi: docEmptyType;
  public Rho: docEmptyType;
  public Sigma: docEmptyType;
  public Tau: docEmptyType;
  public Upsilon: docEmptyType;
  public Phi: docEmptyType;
  public Chi: docEmptyType;
  public Psi: docEmptyType;
  public Omega: docEmptyType;
  public alpha: docEmptyType;
  public beta: docEmptyType;
  public gamma: docEmptyType;
  public delta: docEmptyType;
  public epsilon: docEmptyType;
  public zeta: docEmptyType;
  public eta: docEmptyType;
  public theta: docEmptyType;
  public iota: docEmptyType;
  public kappa: docEmptyType;
  public lambda: docEmptyType;
  public mu: docEmptyType;
  public nu: docEmptyType;
  public xi: docEmptyType;
  public omicron: docEmptyType;
  public pi: docEmptyType;
  public rho: docEmptyType;
  public sigmaf: docEmptyType;
  public sigma: docEmptyType;
  public tau: docEmptyType;
  public upsilon: docEmptyType;
  public phi: docEmptyType;
  public chi: docEmptyType;
  public psi: docEmptyType;
  public omega: docEmptyType;
  public thetasym: docEmptyType;
  public upsih: docEmptyType;
  public piv: docEmptyType;
  public bull: docEmptyType;
  public hellip: docEmptyType;
  public prime: docEmptyType;
  public Prime: docEmptyType;
  public oline: docEmptyType;
  public frasl: docEmptyType;
  public weierp: docEmptyType;
  public imaginary: docEmptyType;
  public real: docEmptyType;
  public trademark: docEmptyType;
  public alefsym: docEmptyType;
  public larr: docEmptyType;
  public uarr: docEmptyType;
  public rarr: docEmptyType;
  public darr: docEmptyType;
  public harr: docEmptyType;
  public crarr: docEmptyType;
  public lArr: docEmptyType;
  public uArr: docEmptyType;
  public rArr: docEmptyType;
  public dArr: docEmptyType;
  public hArr: docEmptyType;
  public forall: docEmptyType;
  public part: docEmptyType;
  public exist: docEmptyType;
  public empty: docEmptyType;
  public nabla: docEmptyType;
  public isin: docEmptyType;
  public notin: docEmptyType;
  public ni: docEmptyType;
  public prod: docEmptyType;
  public sum: docEmptyType;
  public minus: docEmptyType;
  public lowast: docEmptyType;
  public radic: docEmptyType;
  public prop: docEmptyType;
  public infin: docEmptyType;
  public ang: docEmptyType;
  public and: docEmptyType;
  public or: docEmptyType;
  public cap: docEmptyType;
  public cup: docEmptyType;
  public int: docEmptyType;
  public there4: docEmptyType;
  public sim: docEmptyType;
  public cong: docEmptyType;
  public asymp: docEmptyType;
  public ne: docEmptyType;
  public equiv: docEmptyType;
  public le: docEmptyType;
  public ge: docEmptyType;
  public sub: docEmptyType;
  public sup: docEmptyType;
  public nsub: docEmptyType;
  public sube: docEmptyType;
  public supe: docEmptyType;
  public oplus: docEmptyType;
  public otimes: docEmptyType;
  public perp: docEmptyType;
  public sdot: docEmptyType;
  public lceil: docEmptyType;
  public rceil: docEmptyType;
  public lfloor: docEmptyType;
  public rfloor: docEmptyType;
  public lang: docEmptyType;
  public rang: docEmptyType;
  public loz: docEmptyType;
  public spades: docEmptyType;
  public clubs: docEmptyType;
  public hearts: docEmptyType;
  public diams: docEmptyType;
  public OElig: docEmptyType;
  public oelig: docEmptyType;
  public Scaron: docEmptyType;
  public scaron: docEmptyType;
  public Yumlaut: docEmptyType;
  public circ: docEmptyType;
  public tilde: docEmptyType;
  public ensp: docEmptyType;
  public emsp: docEmptyType;
  public thinsp: docEmptyType;
  public zwnj: docEmptyType;
  public zwj: docEmptyType;
  public lrm: docEmptyType;
  public rlm: docEmptyType;
  public ndash: docEmptyType;
  public mdash: docEmptyType;
  public lsquo: docEmptyType;
  public rsquo: docEmptyType;
  public sbquo: docEmptyType;
  public ldquo: docEmptyType;
  public rdquo: docEmptyType;
  public bdquo: docEmptyType;
  public dagger: docEmptyType;
  public Dagger: docEmptyType;
  public permil: docEmptyType;
  public lsaquo: docEmptyType;
  public rsaquo: docEmptyType;
  public euro: docEmptyType;
  public tm: docEmptyType;
}



export class docURLLink extends Text {

}


export class docRefTextType extends Text {

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



export class childnodeType {
  public edgelabels: any[];

  public constructor(p?: childnodeType) {

  }
}

export class codelineType {
  public highlights: highlightType[];

  public constructor(p?: codelineType) {

  }
}

export class compounddefType {
  id: string
  kind: string
  public compoundname: string;
  public title?: string;
  public basecompoundrefs: compoundRefType[];
  public derivedcompoundrefs: compoundRefType[];
  public includess: incType[];
  public includedbys: incType[];
  public incdepgraph?: graphType;
  public invincdepgraph?: graphType;
  public innerdirs: refType[];
  public innerfiles: refType[];
  public innerclasss: refType[];
  public innernamespaces: refType[];
  public innerpages: refType[];
  public innergroups: refType[];
  public templateparamlist?: templateparamlistType;
  public sectiondefs: sectiondefType[];
  public briefdescription?: descriptionType;
  public detaileddescription?: descriptionType;
  public inheritancegraph?: graphType;
  public collaborationgraph?: graphType;
  public programlisting?: listingType;
  public location?: locationType;
  public listofallmembers?: listofallmembersType;

  public constructor(p?: any) {
    if (!p) { return }
    this.id = p.$.id
    this.kind = p.$.kind
    this.compoundname = p.compoundname[0]
    this.title = p.title && p.title[0]
    this.briefdescription = new descriptionType(p.briefdescription[0])
    this.detaileddescription = new descriptionType(p.detaileddescription[0])
    this.sectiondefs = (p.sectiondef || []).map(s => new sectiondefType(s))
  }
}

export class descriptionType {
  public title?: string;
  public para: docParaType[];
  public sect1: docSect1Type[];
  public internal?: docInternalType;

  public constructor(p?: descriptionType) {
    if (!p) { return }
    this.title = p.title
    unArray(this, 'title')
    this.para = (p.para || []).map(p => new docParaType(p))
    this.sect1 = (p.sect1 || []).map(p => new docSect1Type(p))
    this.internal = new docInternalType(p.internal)
  }

}

export class docAnchorType {
  public constructor(p?: docAnchorType) {
    if (!p) { return }
  }
}

export class docBlockQuoteType {
  public para: docParaType[];

  public constructor(p?: docBlockQuoteType) {
    if (!p) { return }
  }
}

export class docCaptionType extends Text {
  public constructor(p?: docCaptionType) {
    if (!p) { return }
    super(p)
  }
}

export class docCopyType {
  public para: docParaType[];
  public sect1: docSect1Type[];
  public internal?: docInternalType;

  public constructor(p?: docCopyType) {
    if (!p) { return }
  }
}

export class docEmptyType {
  public constructor(p?: docEmptyType) {

  }
}

export class docEntryType {
  public para: docParaType[];

  public constructor(p?: docEntryType) {
    if (!p) { return }
  }
}

export class docFileType extends Text {

  public constructor(p?: docFileType) {
    super(p)
    if (!p) { return }
  }
}

export class docFormulaType {
  public constructor(p?: docFormulaType) {
    if (!p) { return }
  }
}

export class docHeadingType extends Text {

  public constructor(p?: docHeadingType) {
    if (!p) { return }
    super(p)
  }
}

export class docImageType {

  public constructor(p?: docImageType) {
    if (!p) { return }
  }
}

export class docIndexEntryType {
  public primaryie: string;
  public secondaryie: string;

  public constructor(p?: docIndexEntryType) {
    if (!p) { return }
  }
}

export class docInternalS1Type {
  public para: docParaType[];
  public sect2s: docSect2Type[];

  public constructor(p?: docInternalS1Type) {
    if (!p) {
      return
    }
  }
}

export class docInternalS2Type {
  public para: docParaType[];
  public sect3s: docSect3Type[];

  public constructor(p?: docInternalS2Type) {
    if (!p) { return }
  }
}

export class docInternalS3Type {
  public para: docParaType[];
  public sect3s: docSect4Type[];

  public constructor(p?: docInternalS3Type) {
    if (!p) { return }
  }
}

export class docInternalS4Type {
  public para: docParaType[];

  public constructor(p?: docInternalS4Type) {
    if (!p) { return }
  }
}

export class docInternalType {
  public para: docParaType[];
  public sect1: docSect1Type[];

  public constructor(p?: docInternalType) {
    if (!p) { return }
  }
}

export class docLanguageType {
  public para: docParaType[];

  public constructor(p?: docLanguageType) {
    if (!p) { return }
  }
}

export class docListItemType {
  public para: docParaType[];

  public constructor(p?: docListItemType) {
    if (!p) { return }
  }
}

export class docListType {
  public listitems: docListItemType[];

  public constructor(p?: docListType) {
    if (!p) { return }
  }
}

export class docMarkupType extends Text {
  public constructor(p?: docMarkupType) {
    if (!p) { return }
    super(p)
  }
}

export class docParamListItem {
  public parameternamelists: docParamNameList[];
  public parameterdescription: descriptionType;

  public constructor(p?: docParamListItem) {
    if (!p) { return }

  }
}

export class docParamListType {
  public parameteritems: docParamListItem[];

  public constructor(p?: docParamListType) {
    if (!p) { return }

  }
}

export class docParamName {
  public ref?: refTextType;

  public constructor(p?: docParamName) {
    if (!p) { return }

  }
}

export class docParamNameList {
  public parametertypes: docParamType[];
  public parameternames: docParamName[];

  public constructor(p?: docParamNameList) {
    if (!p) { return }

  }
}

export class docParamType {
  public ref?: refTextType;

  preformatted: docMarkupType;
  programlisting: listingType;
  verbatim: string;
  indexentry: docIndexEntryType;
  orderedlist: docListType;
  itemizedlist: docListType;
  simplesect: docSimpleSectType;
  title: docTitleType;
  variablelist: docVariableListType;
  table: docTableType;
  public constructor(p?: docParamType) {
    if (!p) { return }

  }
}

export class docParaType extends Text {
  linebreak: docEmptyType;
  hruler: docEmptyType;
  preformatted: docMarkupType;
  programlisting: listingType;
  verbatim: string;
  indexentry: docIndexEntryType;
  orderedlist: docListType;
  itemizedlist: docListType;
  simplesect: docSimpleSectType;
  title: docTitleType;
  variablelist: docVariableListType;
  table: docTableType;
  heading: docHeadingType;
  image: docImageType;
  dotfile: docFileType;
  mscfile: docFileType;
  diafile: docFileType;
  toclist: docTocListType;
  language: docLanguageType;
  parameterlist: docParamListType;
  xrefsect: docXRefSectType;
  copydoc: docCopyType;
  blockquote: docBlockQuoteType;
  parblock: docParBlockType;
  _: string
  public constructor(p?: any) {
    if (!p) { return }
    super(p)
    this._ = p._ || ''
    docCmdGroup(this, p)
  }
}

export class docParBlockType {
  para: docParaType[];
  constructor(p?: docParBlockType) {
    if (!p) { return }

  }
}


export class docTocListType {
  tocitems: docTocItemType[];
  constructor(p?: docTocListType) {

    if (!p) { return }

  }
}

export class docRowType {
  public entrys: docEntryType[];

  public constructor(p?: docRowType) {
    if (!p) { return }

  }
}

export class docSect1Type {
  public title: string;
  public para: docParaType[];
  public sect2s: docSect2Type[];
  public internal?: docInternalS1Type;

  public constructor(p?: docSect1Type) {
    if (!p) { return }

  }
}

export class docSect2Type {
  public title: string;
  public para: docParaType[];
  public sect3s: docSect3Type[];
  public internal?: docInternalS2Type;

  public constructor(p?: docSect2Type) {
    if (!p) { return }

  }
}

export class docSect3Type {
  public title: string;
  public para: docParaType[];
  public sect4s: docSect4Type[];
  public internal?: docInternalS3Type;

  public constructor(p?: docSect3Type) {
    if (!p) { return }

  }
}

export class docSect4Type {
  public title: string;
  public para: docParaType[];
  public internal?: docInternalS4Type;

  public constructor(p?: docSect4Type) {
    if (!p) { return }

  }
}

export class docSimpleSectType {
  public title?: docTitleType;
  public para: docParaType[];

  public constructor(p?: docSimpleSectType) {
    if (!p) { return }
    // (this as any).seba='sdjsdhjfhjsdfhjshjfhjsdhjfsd'+p
    this.para = p.para.map(p => new docParaType(p))
    this.title = (p.title || [])[0]
  }
}

export class docTableType {
  public rows: docRowType[];
  public caption?: docCaptionType;

  public constructor(p?: docTableType) {
    if (!p) { return }

  }
}

export class docTitleType extends Text {

  public constructor(p?: any) {
    if (!p) { return }
    super(p)

  }
}

export class docTocItemType extends Text {

  public constructor(p?: any) {
    if (!p) { return }
    super(p)
  }
}

export class docVariableListType {
  public varlistentry: docVarListEntryType;
  public listitem: docListItemType;

  public constructor(p?: docVariableListType) {
    if (!p) { return }

  }
}

export class docVarListEntryType {
  public term: docTitleType;

  public constructor(p?: docVarListEntryType) {
    if (!p) { return }

  }
}

export class docXRefSectType {
  public xreftitles: string[];
  public xrefdescription: descriptionType;

  public constructor(p?: docXRefSectType) {
    if (!p) { return }

  }
}

export class DoxygenType {
  public compounddef?: compounddefType;
  public constructor(p?: any) {
    if (!p) { return }
    this.compounddef = (p || []).compounddef.map(t => new compounddefType(t))
  }
}

export class enumvalueType {
  public name: any;
  public initializer?: linkedTextType;
  public briefdescription?: descriptionType;
  public detaileddescription?: descriptionType;

  public constructor(p?: enumvalueType) {
    if (!p) { return }

  }
}

export class graphType {
  public nodes: nodeType[];

  public constructor(p?: graphType) {
    if (!p) { return }

  }
}

export class highlightType {
  public sp: any;
  public ref: refTextType;

  public constructor(p?: highlightType) {

    if (!p) { return }
  }
}

export class linkedTextType {
  public refs: refTextType[];

  public constructor(p?: linkedTextType) {
    if (!p) { return }
    this.refs = (p.refs || []).map(r => new refTextType(r))
  }
}

export class linkType {
  public constructor(p?: linkType) {
    if (!p) { return }

  }
}

export class listingType {
  public codelines: codelineType[];

  public constructor(p?: listingType) {
    if (!p) { return }

  }
}

export class listofallmembersType {
  public members: memberRefType[];

  public constructor(p?: listofallmembersType) {
    if (!p) { return }

  }
}

export class locationType {
  public constructor(p?: locationType) {
    if (!p) { return }



  }
}

export class memberdefType {
  public templateparamlist?: templateparamlistType;
  public type?: linkedTextType;
  public definition?: string;
  public argsstring?: string;
  public name: string;
  public read?: any;
  public write?: any;
  public bitfield?: any;
  public reimplementss: reimplementType[];
  public reimplementedbys: reimplementType[];
  public param: paramType[];
  public enumvalues: enumvalueType[];
  public initializer?: linkedTextType;
  public exceptions?: linkedTextType;
  public briefdescription?: descriptionType;
  public detaileddescription?: descriptionType;
  public inbodydescription?: descriptionType;
  public location: locationType;
  public referencess: referenceType[];
  public referencedbys: referenceType[];

  readable?: boolean
  writable?: boolean
  initonly?: boolean
  settable?: boolean
  gettable?: boolean
  final?: boolean
  sealed?: boolean
  new?: boolean
  add?: boolean
  remove?: boolean
  raise?: boolean
  optional?: boolean
  required?: boolean
  accessor?: boolean
  attribute?: boolean
  property?: boolean
  readonly?: boolean
  bound?: boolean
  removable?: boolean
  contrained?: boolean
  transient?: boolean
  maybevoid?: boolean
  maybedefault?: boolean
  maybeambiguous?: boolean
  kind: string
  id: string
  prot: string
  static: boolean
  const: boolean
  explicit: boolean
  inline: boolean
  refqual: string
  virt: string
  volatile: string
  mutable: string

  public constructor(p?: any) {
    if (!p) { return }
    // Object.assign(this, p||{})
    Object.assign(this, p.$ || {})
    unArray(this, 'name', 'definition', 'argsstring', 'location', 'read', 'write', 'bitfield')
    this.param = (this.param || []).map(p => new paramType(p))
    this.type = new linkedTextType(p.type)
    this.briefdescription = new descriptionType(p.briefdescription)
    this.inbodydescription = new descriptionType(p.inbodydescription)
    this.detaileddescription = p.detaileddescription.map(d => new descriptionType(d))

  }
}

export class memberRefType {
  public scope: any;
  public name: any;
  public constructor(p?: memberRefType) {
    if (!p) { return }
  }
}
function unArray(o: any, ...a: string[]) {
  a.forEach(a => {
    if (isArray(o[a]) && o[a].length === 1) {
      return o[a][0]
    }
  })
}
export class nodeType {
  public label: any;
  public link?: linkType;
  public childnodes: childnodeType[];

  public constructor(p?: nodeType) {
    if (!p) { return }

  }
}

export class paramType {
  public type?: linkedTextType;
  public declname?: any;
  public defname?: any;
  public array?: any;
  public defval?: linkedTextType;
  public typeconstraint?: linkedTextType;
  public briefdescription?: descriptionType;

  public constructor(p?: any) {
    if (!p) { return }
    Object.assign(this, { sssssss: p || {} })
    this.type = new linkedTextType(p.defval)
    this.declname = unArray(this, 'declname')
    this.defname = unArray(this, 'defname')
    this.array = unArray(this, 'array')
    this.defval = new linkedTextType(p.defval)
    this.typeconstraint = new linkedTextType(p.linkedTextType)
    this.briefdescription = new descriptionType(p.briefdescription)
  }
}

export class referenceType {
  public constructor(p?: referenceType) {
    if (!p) { return }

  }
}
function F(a?: any) {
  return a && a.length ? a[0] : undefined
}
export class sectiondefType {
  public header?: string;
  public description?: descriptionType;
  public memberdefs: memberdefType[];
  kind: string
  public constructor(p?: any) {
    if (!p) { return }

    this.kind = p.$.kind
    this.header = F(p.header)
    this.description = F(p.description)
    this.memberdefs = (p.memberdef || []).map(m => new memberdefType(m))
  }
}

export class templateparamlistType {
  public params: paramType[];

  public constructor(p?: templateparamlistType) {
    if (!p) { return }

  }
}

export class compoundRefType extends String {
  public constructor(p?: compoundRefType) {
    if (!p) { return }
    super()


  }
}

export class incType extends String {
  public constructor(p?: incType) {
    if (!p) { return }
    super()


  }
}

export class refTextType extends String {
  public constructor(p?: refTextType) {
    if (!p) { return }
    super()
    Object.assign(this, p)
  }
}

export class refType extends String {
  public constructor(p?: refType) {
    if (!p) { return }
    super()


  }
}

export class reimplementType extends String {
  public constructor(p?: reimplementType) {
    if (!p) { return }
    super()


  }
}


function docCmdGroup(o: any, p?: any) {
  // if (!p) { return }
  // var r:any = {}
  asArray(p).map(p => Object.keys(p || {}).map(i => {
    if (i === 'linebreak') { o[i] = new docEmptyType(p[i]) }
    else if (i === 'hruler') { o[i] = new docEmptyType(p[i]) }
    else if (i === 'preformatted') { o[i] = new docMarkupType(p[i]) }
    else if (i === 'programlisting') { o[i] = new listingType(p[i]) }
    //  else if(i==='verbatim') {o[i] = new xsd(p[i])}
    else if (i === 'indexentry') { o[i] = new docIndexEntryType(p[i]) }
    else if (i === 'orderedlist') { o[i] = new docListType(p[i]) }
    else if (i === 'itemizedlist') { o[i] = new docListType(p[i]) }
    else if (i === 'simplesect') { o[i] = new docSimpleSectType(p[i][0]) }
    else if (i === 'title') { o[i] = new docTitleType(p[i]) }
    else if (i === 'variablelist') { o[i] = new docVariableListType(p[i]) }
    else if (i === 'table') { o[i] = new docTableType(p[i]) }
    else if (i === 'heading') { o[i] = new docHeadingType(p[i]) }
    else if (i === 'image') { o[i] = new docImageType(p[i]) }
    else if (i === 'dotfile') { o[i] = new docFileType(p[i]) }
    else if (i === 'mscfile') { o[i] = new docFileType(p[i]) }
    else if (i === 'diafile') { o[i] = new docFileType(p[i]) }
    else if (i === 'toclist') { o[i] = new docTocListType(p[i]) }
    else if (i === 'language') { o[i] = new docLanguageType(p[i]) }
    else if (i === 'parameterlist') { o[i] = new docParamListType(p[i]) }
    else if (i === 'xrefsect') { o[i] = new docXRefSectType(p[i]) }
    else if (i === 'copydoc') { o[i] = new docCopyType(p[i]) }
    else if (i === 'blockquote') { o[i] = new docBlockQuoteType(p[i]) }
    else if (i === 'parblock') { o[i] = new docParBlockType(p[i]) }
    else if (i === 'ref') { o[i] = new refType(p[i]) }
    else if (i === '_') { o[i] = p[i] }
    else {
      throw 'not supported docCmdGroup ' + i
    }
  })).flat()
  // return r
}





