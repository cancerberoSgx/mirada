export interface ClassTest {
  kind: string
  public: boolean
  data: {
    asd: {
      "xmlns:xsi": string
      id: string
      kind: string
      language: string
      prot: string
    }
    "$$": {
      compoundname: string[]
      derivedcompoundref: {
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
            }
            "$$": {
              name: string[]
              enumvalue: {
                "$": {
                  id: string
                  prot: string
                }
                "$$": {
                  name: string[]
                  initializer: string[]
                  briefdescription: string[]
                  detaileddescription: string[]
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
      briefdescription: {
        "$$": {
          para: string[]
        }
      }[]
      detaileddescription: {
        "$$": {
          para: {
            _: string
            "$$": {
              programlisting: {
                "$$": {
                  codeline: {
                    "$$": {
                      highlight: {
                        "$": {
                          class: string
                        }
                        _: string
                        "$$": {
                          sp: string[]
                        }
                      }[]
                    }
                  }[]
                }
              }[]
              ref: {
                "$": {
                  refid: string
                  kindref: string
                }
                _: string
              }[]
              computeroutput: {
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
            }
          }[]
        }
      }[]
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
