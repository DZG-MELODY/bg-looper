import { expose, proxyMarker } from 'comlink'
import { EventBus } from './event-bus'
import { Looper, LooperConfig } from './looper'
import { CustomCallback } from './types';

// 事件总线
const eventBus = new EventBus();
// 轮询器映射表
const looperMap = new Map<string, Looper>()

export interface LoopWorkerExpose {
  // 统一回调函数包裹
  responseCallback: (v: CustomCallback<unknown> & { [proxyMarker]: true }) => void
  // 注册一个轮询器
  registerLooper: (name: string, config: LooperConfig) => boolean
  // 启动指定轮询器
  startLooper: (name: string) => boolean
  // 停止指定轮询器
  stopLooper: (name: string) => boolean
  // 销毁指定轮询器
  destroyLooper: (name: string) => boolean
}

// 统一回调函数
const responseCallback = (cb: CustomCallback<unknown>): void => {
  eventBus.on((name, data) => {
    cb(name, data)
  })
}
// 注册轮询器
const registerLooper = (name: string, config: LooperConfig): boolean => {
  if (looperMap.has(name)) {
    console.warn(`looper ${name} has been registered`);
    return false;
  }
  looperMap.set(name, new Looper(config, (name, data) => {
    eventBus.emit(name, data)
  }));
  return true;
}

// 启动指定轮询器
const startLooper = (name: string): boolean => {
  if (!looperMap.has(name)) return false;
  looperMap.get(name)?.start();
  return true;
}

// 暂停指定轮询器
const stopLooper = (name: string): boolean => {
  if (!looperMap.has(name)) return false;
  looperMap.get(name)?.stop();
  return true;
}

// 销毁指定轮询器
const destroyLooper = (name: string): boolean => {
  if (!looperMap.has(name)) return false;
  looperMap.get(name)?.destroy();
  looperMap.delete(name);
  return true;
}

expose({
  responseCallback,
  registerLooper,
  startLooper,
  stopLooper,
  destroyLooper
});