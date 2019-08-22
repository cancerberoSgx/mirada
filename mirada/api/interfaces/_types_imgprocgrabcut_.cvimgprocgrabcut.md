**[mirada](../README.md)**

[Globals](../README.md) › ["types/imgProcGrabCut"](../modules/_types_imgprocgrabcut_.md) › [CVImgProcGrabCut](_types_imgprocgrabcut_.cvimgprocgrabcut.md)

# Interface: CVImgProcGrabCut

## Hierarchy

* **CVImgProcGrabCut**

  * [CVImgProc](_types_imgproc_.cvimgproc.md)

## Index

### Properties

* [GC_BGD](_types_imgprocgrabcut_.cvimgprocgrabcut.md#gc_bgd)
* [GC_EVAL](_types_imgprocgrabcut_.cvimgprocgrabcut.md#gc_eval)
* [GC_EVAL_FREEZE_MODEL](_types_imgprocgrabcut_.cvimgprocgrabcut.md#gc_eval_freeze_model)
* [GC_FGD](_types_imgprocgrabcut_.cvimgprocgrabcut.md#gc_fgd)
* [GC_INIT_WITH_MASK](_types_imgprocgrabcut_.cvimgprocgrabcut.md#gc_init_with_mask)
* [GC_INIT_WITH_RECT](_types_imgprocgrabcut_.cvimgprocgrabcut.md#gc_init_with_rect)
* [GC_PR_BGD](_types_imgprocgrabcut_.cvimgprocgrabcut.md#gc_pr_bgd)
* [GC_PR_FGD](_types_imgprocgrabcut_.cvimgprocgrabcut.md#gc_pr_fgd)

### Methods

* [grabCut](_types_imgprocgrabcut_.cvimgprocgrabcut.md#grabcut)

## Properties

###  GC_BGD

• **GC_BGD**: *number*

*Defined in [types/imgProcGrabCut.ts:24](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/types/imgProcGrabCut.ts#L24)*

an obvious background pixels

___

###  GC_EVAL

• **GC_EVAL**: *number*

*Defined in [types/imgProcGrabCut.ts:16](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/types/imgProcGrabCut.ts#L16)*

The value means that the algorithm should just resume.

___

###  GC_EVAL_FREEZE_MODEL

• **GC_EVAL_FREEZE_MODEL**: *number*

*Defined in [types/imgProcGrabCut.ts:20](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/types/imgProcGrabCut.ts#L20)*

The value means that the algorithm should just run the grabCut algorithm (a single iteration) with the fixed model

___

###  GC_FGD

• **GC_FGD**: *number*

*Defined in [types/imgProcGrabCut.ts:28](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/types/imgProcGrabCut.ts#L28)*

an obvious foreground (object) pixel

___

###  GC_INIT_WITH_MASK

• **GC_INIT_WITH_MASK**: *number*

*Defined in [types/imgProcGrabCut.ts:12](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/types/imgProcGrabCut.ts#L12)*

The function initializes the state using the provided mask. Note that GC_INIT_WITH_RECT and GC_INIT_WITH_MASK can be combined. Then, all the pixels outside of the ROI are automatically initialized with GC_BGD

___

###  GC_INIT_WITH_RECT

• **GC_INIT_WITH_RECT**: *number*

*Defined in [types/imgProcGrabCut.ts:8](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/types/imgProcGrabCut.ts#L8)*

The function initializes the state and the mask using the provided rectangle. After that it runs iterCount iterations of the algorithm.

___

###  GC_PR_BGD

• **GC_PR_BGD**: *number*

*Defined in [types/imgProcGrabCut.ts:32](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/types/imgProcGrabCut.ts#L32)*

a possible background pixel

___

###  GC_PR_FGD

• **GC_PR_FGD**: *number*

*Defined in [types/imgProcGrabCut.ts:36](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/types/imgProcGrabCut.ts#L36)*

a possible foreground pixel

## Methods

###  grabCut

▸ **grabCut**(`src`: [Mat](../classes/_types_opencv_.mat.md), `mask`: [Mat](../classes/_types_opencv_.mat.md), `rect`: [Rect](../classes/_types_opencv_.rect.md), `bgdModel`: [Mat](../classes/_types_opencv_.mat.md), `fgdModel`: [Mat](../classes/_types_opencv_.mat.md), `iterCount`: number, `mode`: [GrabCutModes](../modules/_types_imgprocgrabcut_.md#grabcutmodes)): *TODO*

*Defined in [types/imgProcGrabCut.ts:38](https://github.com/cancerberoSgx/mirada/blob/d67acf6/mirada/src/types/imgProcGrabCut.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`src` | [Mat](../classes/_types_opencv_.mat.md) |
`mask` | [Mat](../classes/_types_opencv_.mat.md) |
`rect` | [Rect](../classes/_types_opencv_.rect.md) |
`bgdModel` | [Mat](../classes/_types_opencv_.mat.md) |
`fgdModel` | [Mat](../classes/_types_opencv_.mat.md) |
`iterCount` | number |
`mode` | [GrabCutModes](../modules/_types_imgprocgrabcut_.md#grabcutmodes) |

**Returns:** *TODO*