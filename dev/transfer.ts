import { transferHandlers } from 'comlink'


transferHandlers.set("data", {
  canHandle(obj) {
    return typeof obj === "number";
  },
  serialize(obj) {
    return [obj + 100, []];
  },
  deserialize(obj) {
    return obj;
  }
});