type LooperState = 'ready' | 'pending' | 'idle'

export class Looper {

  public id: string = ''
  private timer: number | null = null
  private interval: number = 500
  private state: LooperState = "ready"
  private url: string = ""
  private requestOptions: Request | null = null
  private callback: (data: unknown) => void | null = null

  constructor(url: string, requestOptions: RequestInit, cb: (data: unknown) => void, interval: number) {
    this.url = url;
    this.requestOptions = new Request(this.url, requestOptions);
    this.interval = interval;
    this.callback = cb;
  }

  private loop() {
    if (this.requestOptions === null) {
      throw new Error('request options is null')
    }
    this.state = "pending"
    fetch(this.requestOptions).then((data) => {
      this.state = "idle"
      if (this.callback) this.callback(data)
    })
  }

  public start(): boolean {
    return true
  }

  public stop(): boolean {
    return true
  }

  public destroy(): void {
    // todo:销毁时钟
  }
}