import './transfer';
import { wrap, proxy } from 'comlink'
import { LoopCallback } from './types.js';
import { WorkerLooper } from './worker';



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

type LoopWrap = (v: (data: number, cb?: LoopCallback) => void) => void

type LoopWrapMap = {
  looperA: LoopWrap;
  looperB: LoopWrap;
}

// const callbackA: LoopCallback = (data) => {
//   console.log(`A: ${data}`);
// }

// const callbackB: LoopCallback = (data) => {
//   console.log(`B: ${data}`);
// }

const responseCallback: LoopCallback = (name: string, data: number) => {
  console.log(`from ${name} : ${data}`)
}

const worker = new Worker("./worker.ts");
const api = wrap<WorkerLooper>(worker);

// const proxyCallbackA = proxy(callbackA);
// const proxyCallbackB = proxy(callbackB)

async function init(): Promise<void> {
  // await api.registerLooper('proxyA', 1000)(proxyCallbackA);
  // await api.registerLooper('proxyB', 2000)(proxyCallbackB);
  // const ret1 = await api.innerMap;
  // console.log(ret1);
  // await api.registerLooper('proxyA', 1000);
  // const ret2 = await (api as any)['proxyA'];
  // console.log(ret2);
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  await api.responseCallback(proxy(responseCallback));
  await api.registerLooper('timerA', {
    url: 'http://test',
    interval: 1000,
    data: 0
  })
  await api.registerLooper('timerB', {
    url: 'http://test-b',
    interval: 2000,
    data: 1
  })

}

init();

// api.inc(1).then(() => {
//   console.log('======');
// })
