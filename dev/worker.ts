import { expose } from 'comlink'
import './transfer'
import { LoopCallback } from './types'
// expose({
//   inc(data) {
//     console.log(data);
//   }
// });

// expose({
//   inc(data: number) {
//     console.log(data);
//   }
// });


const looperMap = {
  looperA(cb: LoopCallback) {
    let ret = 0;
    setInterval(() => {
      cb(ret++)
    }, 1000)
  },
  looperB(cb: LoopCallback) {
    let ret = 0;
    setInterval(() => {
      cb(ret++)
    }, 2000)
  }
}

expose(looperMap)