import './transfer';
import { wrap, proxy } from 'comlink'
import { Obj, LoopCallback, LooperMap } from './types.js';



// transferHandlers.set("event", {
//   canHandle(obj) {
//     return obj instanceof Event;
//   },
//   serialize(obj) {
//     return [
//       {
//         targetId: obj && obj.target && obj.target.id,
//         targetClassList: obj &&
//           obj.target &&
//           obj.target.classList && [...obj.target.classList],
//         detail: obj && obj.detail
//       },
//       []
//     ];
//   },
//   deserialize(obj) {
//     return obj
//   }
// });

type LoopWrap = (v: LoopCallback) => void

type LoopWrapMap = {
  looperA: LoopWrap,
  looperB: LoopWrap
}

const callbackA: LoopCallback = (data) => {
  console.log(`A: ${data}`);
}

const callbackB: LoopCallback = (data) => {
  console.log(`B: ${data}`);
}

const worker = new Worker("./worker.ts");
const api = wrap<LoopWrapMap>(worker);

const proxyCallbackA = proxy(callbackA);
const proxyCallbackB = proxy(callbackB)

async function init() {
  await api.looperA(proxyCallbackA);
  await api.looperB(proxyCallbackB);
}

init();

// api.inc(1).then(() => {
//   console.log('======');
// })
