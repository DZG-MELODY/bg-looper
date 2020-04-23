export interface Obj {
  inc: (data: number) => void
}

export type LoopCallback = (data: number) => void

export interface LooperMap {
  looperA: LoopCallback,
  looperB: LoopCallback
}