export interface Obj {
  inc: (data: number) => void
}

export type LoopCallback = (name: string, data: number) => void

export interface LooperMap {
  looperA: LoopCallback,
  looperB: LoopCallback
}