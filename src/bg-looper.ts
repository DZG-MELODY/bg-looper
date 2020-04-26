import { wrap, proxy } from 'comlink'
import { CustomCallback } from './types'
import { LoopWorkerExpose } from './loop-worker';
import { LooperConfig, Looper } from './looper';


// 轮询器注册参数配置
export interface LooperRegisterConfig {
  name: string
  looperConfig: LooperConfig
  responseCallback: (data: unknown, ...rest: Array<unknown>) => void
}

// 注册轮询器映射表
const registerLoopMap = new Map<string, LooperRegisterConfig>()

// 统一响应回调方法
const responseCallback: CustomCallback<unknown> = (name: string, data: unknown) => {
  if (!registerLoopMap.has(name)) return
  registerLoopMap.get(name)?.responseCallback(data, name);
}
// 统一响应回调方法代理
const responseCallbackProxy = proxy(responseCallback);
// worker线程暴露对象
const workerApi = wrap<LoopWorkerExpose>(new Worker('./loop-worker.ts'));

const init = async () => {
  await workerApi.responseCallback(responseCallbackProxy);
}

const registerLooper = async (name: string, config: LooperRegisterConfig) => {
  const ret = await workerApi.registerLooper(name, config.looperConfig);
  if (ret) registerLoopMap.set(name, config);
  return ret;
}

const startLooper = async (name: string) => {
  const ret = await workerApi.startLooper(name);
  return ret;
}

const stopLooper = async (name: string) => {
  const ret = await workerApi.stopLooper(name);
  return ret;
}

const destroyLooper = async (name: string) => {
  const ret = await workerApi.destroyLooper(name);
  return ret;
}

export const BgLooper = {
  init,
  registerLooper,
  startLooper,
  stopLooper,
  destroyLooper
};
