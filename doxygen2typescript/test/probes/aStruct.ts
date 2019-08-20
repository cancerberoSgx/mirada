export interface RootType {
  kind: string
  public: boolean
  data: {
    "$": {
      "xmlns:xsi": string
      id: string
      kind: string
      language: string
      prot: string
    }
    "$$": {
      compoundname: string[]
      basecompoundref: {
        "$": {
          refid: string
          prot: string
          virt: string
        }
        _: string
      }[]
      includes: {
        "$": {
          local: string
        }
        _: string
      }[]
      sectiondef: {
        "$": {
          kind: string
        }
        "$$": {
          memberdef: {
            "$": {
              kind: string
              id: string
              prot: string
              static: string
              const: string
              explicit: string
              inline: string
              virt: string
            }
            "$$": {
              type: string[]
              definition: string[]
              argsstring: string[]
              name: string[]
              param: {
                "$$": {
                  type: {
                    _: string
                    "$$": {
                      ref: {
                        "$": {
                          refid: string
                          kindref: string
                        }
                        _: string
                      }[]
                    }
                  }[]
                  declname: string[]
                }
              }[]
              briefdescription: string[]
              detaileddescription: string[]
              inbodydescription: string[]
              location: {
                "$": {
                  file: string
                  line: string
                  column: string
                  bodyfile: string
                  bodystart: string
                  bodyend: string
                }
              }[]
            }
          }[]
        }
      }[]
      briefdescription: string[]
      detaileddescription: string[]
      inheritancegraph: {
        "$$": {
          node: {
            "$": {
              id: string
            }
            "$$": {
              label: string[]
              link: {
                "$": {
                  refid: string
                }
              }[]
            }
          }[]
        }
      }[]
      collaborationgraph: {
        "$$": {
          node: {
            "$": {
              id: string
            }
            "$$": {
              label: string[]
              link: {
                "$": {
                  refid: string
                }
              }[]
              childnode: {
                "$": {
                  refid: string
                  relation: string
                }
                "$$": {
                  edgelabel: string[]
                }
              }[]
            }
          }[]
        }
      }[]
      location: {
        "$": {
          file: string
          line: string
          column: string
          bodyfile: string
          bodystart: string
          bodyend: string
        }
      }[]
      listofallmembers: {
        "$$": {
          member: {
            "$": {
              refid: string
              prot: string
              virt: string
            }
            "$$": {
              scope: string[]
              name: string[]
            }
          }[]
        }
      }[]
    }
  }
}