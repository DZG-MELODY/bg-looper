
export type EventBusCallback<T> = (event: string, data: T) => void

export class EventBus<T> {
  private events: Array<EventBusCallback<T>> = []

  public on(cb: EventBusCallback<T>): void {
    this.events.push(cb);
  }
  public emit(event: string, data: T): void {
    for (const cb of this.events) {
      cb(event, data);
    }
  }
}