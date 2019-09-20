// // Definitions by Kevin Gravier <kevin@mrkmg.com>

// declare module "gui" {

//     global {
//         namespace NodeJS {
//             interface ProcessVersions {
//                 /**
//                  * Yode library version number. Is defined after the library takes control of the event loop.
//                  */
//                 yode?: string;
//             }
//         }
//     }

//     export interface Vector2dF {
//         x: number;
//         y: number;
//     }

//     export interface PointF {
//         x: number;
//         y: number;
//     }

//     export interface SizeF {
//         height: number;
//         width: number;
//     }

//     export interface RectF {
//         height: number;
//         width: number;
//         x: number;
//         y: number;
//     }

//     export class App {
//         protected constructor();
//         static setApplicationMenu(menu: MenuBar): void;
//         static getApplicationMenu(): MenuBar;
//         static setDockBadgeLabel(label: string): void;
//         static getDockBadgeLabel(): string;
//         static getColor(name: AppThemeColor): Color;
//         static getDefaultFont(): Font;
//         static getClipboardType(): ClipboardDataType;
//     }

//     /**
//      * Current Application instance.
//      */
//     export const app: typeof App;

//     export class TableModel {
//         static getRowCount(): number;
//         static getValue(column: number, row: number): any;
//         static setValue(column: number, row: number, value: any): void;
//         static notifyRowInsertion(row: number): void;
//         static notifyValueChange(column: number, row: number): void;
//     }

//     /**
//      * This class implements the signal/slot pattern, which is used as event type.
//      * 
//      * Yue uses the signal/slot pattern for the event system, each event is a signal that can be connected by multiple slots, 
//      * and event handlers are slots that can connect to multiple signals.
//      * 
//      * In Yue each signal is an instance of Signal class, while slot is just a function.
//      * 
//      * ```
//      * const {app} = require('gui')
//      * app.onReady.connect(() => console.log('on ready'))
//      * ```
//      * 
//      * It is also possible to connect a slot to a signal by assignment, which is a shorthand of calling connect.
//      * 
//      * ```
//      * app.onReady = () => console.log('on ready')
//      * ```
//      */ 
//     export class Signal<Slot extends (...args: any)=>any> {
//       /**
//        * Connect slot to the signal, and return an ID that can be used to disconnect it.
//        * 
//        * The signature of slot must match the event's type.
//        */
//       connect(slot: Slot): number;
//       /**
//        * Disconnect the id from the signal.
//        */
//       disconnect(id:number): void;
//       /**
//        * Disconnect all slots in the signal.
//        */
//       disconnectAll():void
//       /**
//        * Return true if there is no slot connected to the signal.
//        */
//       isEmpty():boolean
//     }

//     // type EventMember<Slot extends (...args: any)=>any> = Slot | Signal<Slot>

//     export class BrowserOptions {
//         /**
//          * Whether the browser can show devtools, default is false.
//          * 
//          * Depending on platform, the option to show devtools is usually in the context menu, so you should also enable builtin context menu when using this option.
//          * 
//          * Currently this option is not working on Windows.
//          */
//         devtools?: boolean
//         /**
//          * Whether to use builtin context menu, default is false.
//          * 
//          * On macOS due to the limitation of system APIs, right-clicking certain elements would still popup a menu with Services items.
//          */
//         contextMenu?: boolean
//         /**
//          * macOS and Linux only. Whether file access is allowed from file URLs, default is false.
//          * 
//          * By default, when something is loaded in using a file URI, cross origin requests to other file resources are not allowed. This setting allows you to change that behaviour, so that it would be possible to do a XMLHttpRequest of a local file, for example.
//          */
//         allowFileAccessFromFiles?: boolean
//         /**
//          * Linux only. Whether to enable hardware acceleration, default is true.
//          */
//         hardwareAcceleration?: boolean
//     }

//     export class Browser extends View {
//         static create(options: BrowserOptions): Browser
//         /**
//          * Load the URL
//          */
//         loadURL(url:string):void
//         /**
//          * Set the webpage contents and base URL.
//          * @param html The string to use as the contents of the webpage.
//          * @param baseurl A URL used to resolve relative URLs within the document.
//          */
//         loadHTML(html: string, baseurl: string): void
//         /**
//          * Add a native binding to web page with name.
//          * 
//          * The func will be called with automatically converted arguments.
//          */
//         addBinding(name:string, func: (...args: any[])=>any): void
//     }

//     export class View {
//         protected constructor();
//         cancelDrag(): void;
//         doDrag(data: ClipboardData[], operations: DragOperation): number;
//         doDragWithOptions(data: ClipboardData[], operations: DragOperation, options: DragOptions): number;
//         focus(): void;
//         getBounds(): RectF;
//         getComputedLayout(): string;
//         getMinimumSize(): SizeF;
//         getParent(): View;
//         getWindow(): Window;
//         handleDragEnter(self: this, info: DraggingInfo, point: PointF): DragOperation;
//         handleDragUpdate(self: this, info: DraggingInfo, point: PointF): DragOperation;
//         handleDrop(self: this, info: DraggingInfo, point: PointF): boolean;
//         hasCapture(): boolean;
//         hasFocus(): boolean;
//         isDragging(): boolean;
//         isEnabled(): boolean;
//         isFocusable(): boolean;
//         isMouseDownCanMoveWindow(): boolean;
//         isVisible(): boolean;
//         layout(): void;
//         offsetFromView(view: View): Vector2dF;
//         offsetFromWindow(): Vector2dF;
//         onCaptureLost(self: this): void;
//         onDragLeave(self: this, info: DraggingInfo): void;
//         onKeyDown(self: this, event: KeyEvent): void;
//         onKeyUp(self: this, event: KeyEvent): void;
//         onMouseDown(self: this, event: MouseEvent): void;
//         onMouseEnter(self: this, event: MouseEvent): void;
//         onMouseLeave(self: this, event: MouseEvent): void;
//         onMouseMove(self: this, event: MouseEvent): void;
//         onMouseUp: Signal<(self: this, event: MouseEvent)=> void> //| ((self: this, event: MouseEvent)=> void) 
//         onSizeChanged(self: this): void;
//         registerDraggedTypes(types: ClipboardDataType[]): void;
//         releaseCapture(): void;
//         schedulePaint(): void;
//         schedulePaintRect(rect: RectF): void;
//         setBackgroundColor(color: ColorArg): void;
//         setCapture(): void;
//         setColor(color: ColorArg): void;
//         setCursor(cursor: Cursor): void;
//         setEnabled(isEnabled: boolean): void;
//         setFocusable(isFocusable: boolean): void;
//         setFont(font: Font): void;
//         setMouseDownCanMoveWindow(can: boolean): void;
//         setStyle(styles: StyleProperties): void; 
//         setVisible(isVisible: boolean): void;
//     }

//     export interface CreateButtonOptions {
//         title: string;
//         type: ButtonType;
//     }

//     export class Button extends View {
//         static create(title: string): Button;
//         static create(options: CreateButtonOptions): Button;
//         protected constructor();
//         getButtonStyle(): ButtonStyle;
//         getImage(): Image;
//         getTitle(): string;
//         hasBoarder(): boolean;
//         isChecked(): boolean;
//         onClick(self: this): void;
//         //  onClick: Signal<(self: this, event: MouseEvent)=> void> 
//         setButtonStyle(style: ButtonStyle): void;
//         setChecked(isChecked: boolean): void;
//         setHasBoarder(hasBoarder: boolean): void;
//         setImage(image: Image): void;
//         setTitle(title: string): void;
//     }

//     export class Canvas {
//         static create(size: SizeF, scaleFactor: number): Canvas;
//         static createForMainScreen(size: SizeF): Canvas;
//         protected constructor();
//         getPainter(): Painter;
//         getScaleFactor(): number;
//         getSize(): SizeF;
//     }

//     export class Clipboard {
//         protected constructor();
//         clear(): void;
//         getData(type: ClipboardDataType): ClipboardData;
//         getText(): string;
//         isDataAvailable(type: ClipboardDataType): boolean;
//         setData(objects: ClipboardData[]): void;
//         setText(text: string): void;
//     }

//     export class Color {
//         protected constructor();
//         static rgb(r: number, g: number, b: number): Color;
//         static argb(a: number, r: number, g: number, b: number): Color;
//     }

//     type ColorArg = Color | string;

//     export class ComboBox extends Picker {
//         static create(): ComboBox;
//         protected constructor();
//         getText(): string;
//         onTextChange(self: this): void;
//         setText(text: string): void;
//     }

//     export class Container extends View {
//         static create(): Container;
//         protected constructor();
//         addChildView(view: View): void;
//         addChildViewAt(view: View, index: number): void;
//         childAt(index: number): View;
//         childCount(): number;
//         getPreferredHeightForWidth(width: number): number;
//         getPreferredSize(): SizeF;
//         getPreferredWidthForHeight(height: number): number;
//         onDraw(self: this, painter: Painter, dirty: RectF): void;
//         removeChildView(view: View): void;
//     }

//     export class Cursor {
//         protected constructor();
//         static createWithType(type: CursorType): Cursor;
//     }

//     export class Entry extends View {
//         static create(): Entry;
//         static createType(type: EntryType): Entry;
//         protected constructor();
//         getText(): string;
//         onActivate(self: this): void;
//         onTextChange(self: this): void;
//         setText(text: string): void;
//     }

//     export class FileDialog {
//         protected constructor();
//         static optionMultiSelect: number;
//         static optionPickFolders: number;
//         static optionShowHidden: number;
//         getResult(): string;
//         run(): boolean;
//         runForWindow(window: Window): boolean;
//         setButtonLabel(label: Label): void;
//         setFilters(filters: FileDialogFilter[]): void;
//         setFolder(folder: string): void;
//         setOptions(options: number): void;
//         setTitle(title: string): void;
//         setFilename(filename: string):void;
//     }

//     export class FileOpenDialog extends FileDialog {
//         protected constructor();
//         getResults(): string[];
//         static create(): FileOpenDialog;
//     }

//     export class FileSaveDialog extends FileDialog {
//         protected constructor();
//         static create(): FileSaveDialog;
//     }

//     export class Font {
//         static create(name: string, size: number, weight: FontWeight, style: FontStyle): Font;
//         static default(): Font;
//         protected constructor();
//         derive(sizeDetla: number, weight: FontWeight, style: FontStyle): Font;
//         getName(): string;
//         getSize(): number;
//         getStyle(): FontStyle;
//         getWeight(): FontWeight;
//     }

//     export class GifPlayer extends View {
//         static create(): GifPlayer;
//         protected constructor();
//         getImage(): Image;
//         isAnimating(): boolean;
//         setAnimating(isAnimating: boolean): void;
//         setImage(image: Image): void;
//     }

//     export class Group extends View {
//         static create(title: string): Group;
//         protected constructor();
//         getContentView(): View;
//         getTitle(): string;
//         setContentView(view: View): void;
//         setTitle(title: string): void;
//     }

//     export class Image {
//         static createEmpty(): Image;
//         /**
//          * Creates an image from given buffer containing an image encoded with a supported format like jpg or png. 
//          * 
//          * Any ArrayBuffer, Node's Buffer or views (like UInt8Array) can be passed, example:
//          * 
//          * ```let image = gui.Image.createFromBuffer(readFileSync('lenna.jpg'), 1)```
//          * 
//          */
//         static createFromBuffer(buffer: ArrayBuffer | ArrayBufferView, scaleFactor: number): Image;
//         static createFromPath(path: string): Image;
//         protected constructor();
//         getScaleFactor(): number;
//         getSize(): SizeF;
//     }

//     export class Label extends View {
//         static create(text: string): Label;
//         protected constructor();
//         getText(): string;
//         setAlign(align: TextAlign): void;
//         setText(text: string): void;
//         setVAlign(align: TextAlign): void;
//     }

//     export class Lifetime {
//         onActivate(): void;
//         onReady(): void;
//     }

//     export interface MenuItemOptions {
//         accelerator?: Accelerator;
//         checked?: boolean;
//         enabled?: boolean;
//         label?: string;
//         onClick?: (menuItem: MenuItem) => void;
//         role?: MenuItemRole;
//         submenu?: MenuItemOptions[];
//         type?: MenuItemType;
//         visible?: boolean;
//     }

//     export class MenuItem {
//         static create(type: MenuItemType): MenuItem;
//         static create(options: MenuItemOptions): MenuItem;
//         protected constructor();
//         click(): void;
//         getLabel(): string;
//         getSubmenu(): Menu;
//         isChecked(): boolean;
//         isEnabled(): boolean;
//         isVisible(): boolean;
//         onClick(self: this): void;
//         setAccelerator(accelerator: Accelerator): void;
//         setChecked(isChecked: boolean): void;
//         setEnabled(isEnabled: boolean): void;
//         setLabel(label: string): void;
//         setSubmenu(submenu: Menu): void;
//         setVisible(isVisible: boolean): void;
//     }

//     export class MenuBase {
//         append(item: MenuItem): void;
//         insert(item: MenuItem, index: number): void;
//         itemAt(index: number): MenuItem;
//         itemCount(): number;
//         remove(item: MenuItem): void;
//     }

//     export class Menu extends MenuBase {
//         protected constructor();
//         popup(): void;
//         static create(items: MenuItemOptions[]): Menu;
//     }

//     export class MenuBar extends MenuBase {
//         protected constructor();
//         static create(items: MenuItemOptions[] | MenuItem[]): MenuBar;
//     }

//     export class MessageLoop {
//         static run(): void;
//         static quit(): void;
//         static postTask(task: Function): void;
//         static postDelayedTask(ms: number, task: Function): void;
//     }

//     export class Painter {
//         arc(point: PointF, radius: number, sa: number, ea: number): void;
//         beginPath(): void;
//         bezierCurveTo(cp1: PointF, cp2: PointF, ep: PointF): void;
//         clip(): void;
//         /**
//          * Set the color used for shapes' outlines.
//          */
//         setStrokeColor(color: ColorArg): void;
//         /**
//          * Set the color used when filling shapes.
//          */
//         setFillColor(color: ColorArg): void;
//         clipRect(rect: RectF): void;
//         closePath(): void;
//         drawCanvas(canvas: Canvas, rect: RectF): void;
//         drawCanvasFromRect(canvas: Canvas, src: RectF, dest: RectF): void;
//         drawImage(image: Image, rect: RectF): void;
//         drawImageFromRect(image: Image, src: RectF, dest: RectF): void;
//         drawText(text: string, rect: RectF, attributes: TextAttributes): void;
//         fill(): void;
//         fillRect(rect: RectF): void;
//         lineTo(point: PointF): void;
//         measureText(text: string, width: number, attributes: TextAttributes): void;
//         moveTo(point: PointF): void;
//         rect(rect: RectF): void;
//         restore(): void;
//         rotate(angle: number): void;
//         save(): void;
//         scale(scale: Vector2dF): void;
//         setColor(color: ColorArg): void;
//         setLineWidth(width: number): void;
//         stroke(): void;
//         strokeRect(rect: RectF): void;
//         translate(offset: Vector2dF): void;
//     }

//     export class Picker extends View {
//         static create(): Picker;
//         protected constructor();
//         addItem(title: string): void;
//         getItems(): string[];
//         getSelectedItem(): string;
//         getSelectedItemIndex(): number;
//         onSelectionChanged(self: this): void;
//         removeItemAt(index: number): void;
//         selectItemAt(index: number): void;
//     }

//     export class ProgressBar extends View {
//         static create(): ProgressBar;
//         protected constructor();
//         getValue(): number;
//         isIndeterminate(): boolean;
//         setIndeterminate(isIndeterminate: boolean): void;
//         setValue(percent: number): void;
//     }

//     export class Scroll extends View {
//         static create(): Scroll;
//         protected constructor();
//         getContentSize(): SizeF;
//         getContentView(view: View): void;
//         getScrollbarPolicy(): [ScrollPolicy, ScrollPolicy];
//         isOverlayScrollbar(): boolean;
//         setContentSize(size: SizeF): void;
//         setContentView(view: View): void;
//         setOverlayScrollbar(overlay: boolean): void;
//         setScrollbarPolicy(hPolicy: ScrollPolicy, vPolicy: ScrollPolicy): void;
//     }

//     export class SimpleTableModel extends TableModel {
//         protected constructor();
//         addRow(row: any[]): void;
//         removeRowAt(index: number): void;
//         static create(columns: number): SimpleTableModel;
//     }

//     export class Slider extends View {
//         static create(): Slider;
//         protected constructor();
//         getRange(): [number, number];
//         getValue(): number;
//         onSlidingComplete(self: this): void;
//         onValueChange(self: this): void;
//         setRange(min: number, max: number): void;
//         setStep(step: number): void;
//         setValue(value: number): void;
//     }

//     export class Tab extends View {
//         static create(): Tab;
//         protected constructor();
//         addPage(title: string, view: View): void;
//         getSelectedPage(): View;
//         getSelectedPageIndex(): number;
//         onSelectedPageChange(self: this): void;
//         pageAt(index: number): View;
//         pageCount(): number;
//         removePage(view: View): void;
//         selectPageAt(index: number): void;
//     }

//     export class Table extends View {
//         static create(): Table;
//         protected constructor();
//         addColumn(title: string): void;
//         addColumnWithOptions(title: string, options: TableColumnOptions): void;
//         getColumnCount(): number;
//         getModel(): TableModel;
//         getRowHeight(): number;
//         getSelectedRow(): number;
//         isColumnsVisible(): void;
//         selectRow(row: number): void;
//         setColumnsVisible(isColumnsVisible: boolean): void
//         setModel(model: TableModel): void;
//         setRowHeight(height: number): void;
//     }

//     export class TextEdit extends View {
//         static create(): TextEdit;
//         protected constructor();
//         canRedo(): boolean;
//         canUndo(): boolean;
//         copy(): void;
//         cut(): void;
//         delete(): void;
//         deleteRange(start: number, end: number): void;
//         getSelectionRange(): [number, number];
//         getText(): string;
//         getTextBounds(): RectF;
//         getTextInRange(start: number, end: number): string;
//         insertTextAt(text: string, position: number): void;
//         onTextChange(self: this): void;
//         paste(): void;
//         redo(): void;
//         selectAll(): void;
//         selectRange(start: number, end: number): void;
//         setOverlayScrollbar(overlay: boolean): void;
//         setScrollbarPolicy(hPolicy: ScrollPolicy, vPolicy: ScrollPolicy): void;
//         setText(text: string): void;
//         shouldInsertNewLine(self: this): true;
//         undo(): void;
//     }

//     export type ToolbarItem = "default" | "icon-and-label" | "icon" | "label";

//     export class Toolbar {
//         static create(identifier: string): Toolbar;
//         protected constructor();
//         getIdentifier(): string;
//         getItem(toolbar: any, identifier: string): ToolbarItem;
//         isVisible(): boolean;
//         setAllowCustomization(allow: boolean): void;
//         setAllowedItemIdentifiers(identifiers: string[]): void;
//         setDefaultItemIdentifiers(identifiers: string[]): void;
//         setDisplayMode(mode: ToolbarDisplayMode): void;
//         setVisible(visible: boolean): void;
//     }

//     export class Tray {
//         static createWithImage(icon: Image): Tray;
//         static createWithTitle(title: string): Tray;
//         protected constructor();
//         getMenu(): Menu;
//         onClick(self: this): void;
//         setImage(icon: Image): void;
//         setMenu(menu: Menu): void;
//         setTitle(title: string): void;
//     }

//     export type VibrantMaterial =
//         "appearance-based" |
//         "light" |
//         "dark" |
//         "titlebar";

//     export type VibrantBlendingMode =
//         "behind-window" |
//         "within-window";

//     export class Vibrant extends Container {
//         static create(): Vibrant;
//         protected constructor();
//         getBlendingMode(): VibrantBlendingMode;
//         getMaterial(): VibrantMaterial;
//         setBlendingMode(mode: VibrantBlendingMode): void;
//         setMaterial(material: VibrantMaterial): void;
//     }

//     export class Window {
//         static create(options: WindowOptions): Window;
//         protected constructor();
//         activate(): void;
//         addChildWindow(window: Window): void;
//         center(): void;
//         close(): void;
//         deactivate(): void;
//         getBounds(): RectF;
//         getChildWindows(): Window[];
//         getContentSize(): SizeF;
//         getContentSizeConstraints(): [SizeF, SizeF];
//         getContentView(): View;
//         getMenuBar(): MenuBar;
//         getParentWindow(): Window;
//         getTitle(): string;
//         getToolbar(toolbar: Toolbar): void;
//         hasFrame(): boolean;
//         hasShadow(): boolean;
//         isActive(): void;
//         isAlwaysOnTop(): boolean;
//         isFullscreen(): boolean;
//         isFullSizeContentView(): boolean;
//         isMaximizable(): boolean;
//         isMaximized(): boolean;
//         isMinimizable(): boolean;
//         isMinimized(): boolean;
//         isMovable(): boolean;
//         isResizeable(): boolean;
//         isTitleVisible(): boolean;
//         isTransparent(): boolean;
//         isVisible(): boolean;
//         maximize(): void;
//         minimize(): void;
//         onBlur(self: this): void;
//         onClose(self: this): void;
//         onFocus(self: this): void;
//         removeChildWindow(window: Window): void;
//         restore(): void;
//         setAlwaysOnTop(isAlwaysOnTop: boolean): void;
//         setBackgroundColor(color: ColorArg): void;
//         setBounds(bounds: RectF): void;
//         setContentSize(size: SizeF): void;
//         setContentSizeConstraints(minsize: SizeF, maxsize: SizeF): void;
//         setContentView(view: View): void;
//         setFullscreen(isFullscreen: boolean): void;
//         setFullSizeContentView(full: boolean): void;
//         setHasShadow(hasShadow: boolean): void;
//         setMaximizable(isMaximizable: boolean): void;
//         setMenuBar(menubar: MenuBar): void;
//         setMinimizable(isMinimizable: boolean): void;
//         setMovable(isMovable: boolean): void;
//         setResizable(isResizable: boolean): void;
//         setSizeConstrains(minsize: SizeF, maxsize: SizeF): void;
//         setTitle(title: string): void;
//         setTitleVisible(visible: boolean): void;
//         setToolbar(toolbar: Toolbar): void;
//         setVisible(isVisible: boolean): void;
//         shouldClose(self: this): boolean;
//         unmaximize(): void;
//     }

//     export type Accelerator = string;
//     export type AppThemeColor = "text" | "disabled-text";

//     export interface BrowserOptions {
//         allowFileAccessFromFiles?: boolean;
//         contextMenu?: boolean;
//         devtools?: boolean;
//         hardwareAcceleration?: boolean;
//     }

//     export type ButtonStyle =
//         "rounded" |
//         "regular-square" |
//         "thick-square" |
//         "thicker-square" |
//         "disclosure" |
//         "shadowless-square" |
//         "circular" |
//         "textured-square" |
//         "help-button" |
//         "small-square" |
//         "textured-rounded" |
//         "round-rect" |
//         "recessed" |
//         "rounded-disclosure" |
//         "inline";

//     export type ButtonType = "normal" | "checkbox" | "radio";

//     export type ClipboardDataType = "text" | "html" | "image" | "file-paths" | "none";

//     type ClipboardDataText = { type: "text", value: string };
//     type ClipboardDataHtml = { type: "html", value: string };
//     type ClipboardDataImage = { type: "image", value: Image };
//     type ClipboardDataFilePaths = { type: "file-paths", value: string[] };
//     type ClipboardDataNone = { type: "none", value: null };

//     export type ClipboardData =
//         ClipboardDataText |
//         ClipboardDataHtml |
//         ClipboardDataImage |
//         ClipboardDataFilePaths |
//         ClipboardDataNone;

//     export type CursorType =
//         "default" |
//         "hand" |
//         "crosshair" |
//         "progress" |
//         "text" |
//         "not-allowed" |
//         "help" |
//         "move" |
//         "resize-ew" |
//         "resize-ns" |
//         "resize-nesw" |
//         "resize-nwse";

//     export type DragOperation = number;

//     export class DraggingInfo {
//         static dragOperationCopy: number;
//         static dragOperationMove: number;
//         static dragOperationNone: number;
//         getData(type: ClipboardDataType): boolean;
//         getDragOperations(): number
//         isDataAvailable(type: ClipboardDataType): boolean;
//     }

//     export interface DragOptions {
//         image: Image;
//     }

//     export type EntryType = "normal" | "password";

//     export class Event {
//         static maskAlt: number;
//         static maskControl: number;
//         static maskMeta: number;
//         static maskShift: number;
//         modifiers: number;
//         timestamp: number;
//         type: any; // TODO - docs 404 error
//         isAltPressed(): boolean;
//         isControlPressed(): boolean;
//         isMetaPressed(): boolean;
//         isShiftPressed(): boolean;
//     }

//     export interface FileDialogFilter {
//         description: string;
//         extensions: string[];
//     }

//     export type FontStyle = "normal" | "italic";
//     export type FontWeight =
//         "thin" |
//         "extra-light" |
//         "light" |
//         "normal" |
//         "medium" |
//         "semi-bold" |
//         "bold" |
//         "extra-bold" |
//         "black";
//     export type KeyboardCode = string;

//     export class KeyEvent extends Event {
//         key: KeyboardCode;
//     }

//     export type MenuItemRole =
//         "copy" |
//         "cut" |
//         "paste" |
//         "select-all" |
//         "undo" |
//         "redo" |
//         "about" |
//         "hide" |
//         "hide-others" |
//         "unhide" |
//         "help" |
//         "window" |
//         "services";

//     export type MenuItemType =
//         "label" |
//         "checkbox" |
//         "radio" |
//         "separator" |
//         "submenu";

//     export class MouseEvent extends Event {
//         button: 1 | 2 | 3;
//         positionInView: PointF;
//         positionInWindow: PointF;
//     }

//     export type ScrollPolicy = "always" | "never" | "automatic";

//     export interface TableColumnOptions {
//         column?: number;
//         onDraw?: (painter: Painter, rect: RectF, value: any) => void;
//         type?: TableColumnType;
//         width?: number;
//     }

//     export type TableColumnType = "text" | "edit" | "custom";
//     export type TextAlign = "start" | "center" | "end";

//     export interface TextAttributes {
//         align?: TextAlign;
//         color?: ColorArg;
//         ellipsis?: boolean;
//         font?: Font;
//         valign?: TextAlign;
//         wrap?: boolean;
//     }

//     export interface TextMetrics {
//         size: SizeF;
//     }

//     export type ToolbarDisplayMode = "default" | "icon-and-label" | "icon" | "label";

//     export interface WindowOptions {
//         frame?: boolean;
//         showTrafficLights?: boolean;
//         transparent?: boolean;
//     }

//     /**
//      * Yoga style properties. Name mapping deifned here
//      * https://github.com/yue/yue/blob/master/nativeui/util/yoga_util.cc
//      */
//     export interface StyleProperties {
      
//         heightAuto?: boolean
//         heightPercent?: number
//         marginAuto?: Edge
//         marginPercent?: Partial<ValuedEdges<number>>
//         flexWrap?: FlexWrap
//         flexDirection?: FlexDirection
//         direction?: Direction
//         flexBasis?: number
//         flexBasisPercent?: number
//         alignContent?: Align
//         alignItems?: Align
//         alignSelf?: Align
//         aspectRatio?: number
        
//         border?: Partial<ValuedEdges<string | number>>
//         borderTop?: number|string
//         borderRight?: number|string
//         borderBottom?: number|string
//         borderLeft?: number|string        

//         display?: Display
//         flex?: number
//         flexGrow?: number
//         flexShrink?: number
//         height?: number| string
//         justifyContent?: JustifyContent

//         margin?: Partial<ValuedEdges<string | number>>
//         marginTop?: number|string
//         marginRight?: number|string
//         marginBottom?: number|string
//         marginLeft?: number|string

//         maxHeight?: number | string
//         maxHeightPercent?: number
//         maxWidth?: number | string
//         maxWidthPercent?: number
//         minHeight?: number | string
//         minHeightPercent?: number
//         minWidth?: number | string
//         minWidthPercent?: number
//         overflow?: Overflow

//         padding?: Partial<ValuedEdges<number>>
//         paddingTop?:number|string
//         paddingLeft?:number|string
//         paddingRight?:number|string
//         paddingBottom?:number|string
//         position?: PositionType

//         width?: number| string
//         widthAuto?: boolean
//         widthPercent?: number
//         bottom?: number | string
//         right?: number | string
//     }

//     type ValuedEdges<V> = {
//       [edge in Edge]: V;
//     }

//     type JustifyContent = 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'space-evenly'

//     type Align = 'auto' | 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'stretch'

//     type FlexDirection = 'column' | 'column-reverse' | 'count' | 'row' | 'row-reverse'

//     type Direction = 'inherit' | 'ltr' | 'rtl'

//     type FlexWrap = 'no-wrap' | 'wrap' | 'wrap-reverse'

//     type Edge = 'left' | 'top' | 'right' | 'bottom' | 'start' | 'end' | 'horizontal' | 'vertical' | 'all'

//     type Display = 'flex' | 'none'

//     type Unit = 'auto' | 'percent' | 'point' | 'undefined'

//     type Overflow = 'hidden' | 'scroll' | 'visible'

//     type PositionType = 'absolute' | 'relative'

// }
