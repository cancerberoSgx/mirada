// import { Emitter } from 'misc-utils-of-mine-generic';
// import { FabricEvent } from '../ui/imageEditor/canvasOverlay';

// export type GlobalEvents = 'FabricSelection';

// export interface GlobalEvent<T extends GlobalEvents> {
//   name: T;
// }

// export interface GlobalEventsMap {
//   ['FabricSelection']: FabricEvent;
// }

// const globalEmitter = new Emitter();

// export function globalEmit<T extends GlobalEvents>(e: GlobalEventsMap[T]) {
//   globalEmitter.emit(e);
// }

// export function globalListen<T extends GlobalEvents>(l: (e: GlobalEventsMap[T]) => void) {
//   globalEmitter.add(l);
// }
