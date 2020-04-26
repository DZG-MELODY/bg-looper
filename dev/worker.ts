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

// export type LoopItemFn = (cb: LoopCallback) => void

// function createLoop(interval: number = 1000): LoopItemFn {
//   // return (cb: LoopCallback) => {
//   //   let ret = 0;
//   //   setInterval(() => {
//   //     cb(ret++)
//   //   }, interval);
//   // }

// }


// export interface LoopMap {
//   innerMap: Map<string, LoopCallback>,
//   registerLooper: (name: string, interval: number) => void
// }

// const looperMap: LoopMap = {
//   innerMap: new Map<string, LoopCallback>(),
//   registerLooper(name: string, interval: number): void {
//     // this.innerMap.set(name, () => {
//     //   let ret = 0;
//     //   setInterval(() => {
//     //     ret++
//     //   }, interval);
//     // });
//     Object.defineProperty(this, name, {
//       value: function () {
//         let ret = 0;
//         setInterval(() => {
//           ret++;
//           console.log(ret);
//         }, 1000);
//       }
//     })
//     // return this.innerMap.get(name) as LoopItemFn;
//   }
// }


export interface TimerConfig {
  url: string
  interval: number
  timer?: number | null
  data: number
}

class EventEmit {
  private events: Array<(name: string, data: number) => void> = []
  public on(cb: (name: string, data: number) => void): void {
    this.events.push(cb);
  }
  public emit(name: string, data: number) {
    for (const cb of this.events) {
      console.log(`to ${name}`)
      cb(name, data)
    }
  }
}

const eventBus = new EventEmit();

const timerMap = new Map<string, TimerConfig>()

const responseCallback = (cb: LoopCallback): void => {
  eventBus.on((name, data) => {
    cb(name, data)
  })
}

const registerLooper = (name: string, config: TimerConfig): void => {
  timerMap.set(name, config);
  const timerConfig = timerMap.get(name);
  if (timerConfig) {
    timerConfig.timer = setInterval(() => {
      eventBus.emit(name, timerConfig.data++)
    }, timerConfig.interval)
  }
}

export interface WorkerLooper {
  responseCallback: (v: (cb: LoopCallback) => void) => void
  registerLooper: (name: string, config: TimerConfig) => void
}

expose({
  responseCallback,
  registerLooper
})