// 轮询器状态
export type LooperState = 'ready' | 'pending' | 'idle'

export interface LooperRequestConfig {
  method?: "get" | "post";
  url: string;
}

// 轮询器参数配置
export interface LooperConfig {
  id: string;
  interval?: number;
  requestConfig: LooperRequestConfig;
}

export class Looper {

  public id = ''
  private timer: NodeJS.Timeout | null = null
  private interval = 500
  private state: LooperState = "ready"
  // todo: 要修正
  private reqConfig: LooperRequestConfig = {
    method: "get",
    url: ""
  }
  private callback: (name: string, data: unknown) => void

  constructor(config: LooperConfig, responseCallback: (name: string, data: unknown) => void) {
    const { id, interval } = config;
    if (!id) throw new Error('id must not be empty')
    this.id = id;
    this.interval = interval || 500;
    this.reqConfig = config.requestConfig;
    this.callback = responseCallback;
    this.state = 'ready';
  }

  private loopHandler(): void {
    if (this.state !== "idle") return
    this.state = "pending";
    fetch(this.reqConfig.url)
      .then(response => response.json())
      .then((data) => {
        this.state = "idle";
        this.callback(this.id, data)
      })
      .catch(err => {
        this.state = "idle";
        this.callback(this.id, err)
      })
  }

  public start(): boolean {
    if (this.timer) return false;
    this.state = "idle";
    this.timer = setInterval(() => {
      this.loopHandler()
    }, this.interval);
    return true
  }

  public stop(): boolean {
    if (!this.timer) return false;
    clearInterval(this.timer);
    this.timer = null;
    return true
  }

  public destroy(): void {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
  }
}