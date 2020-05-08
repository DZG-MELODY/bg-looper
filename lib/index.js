Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const comlink_1 = require("comlink");
// @ts-ignore
const loop_worker_1 = tslib_1.__importDefault(require("web-worker:./loop-worker"));
// 注册轮询器映射表
const registerLoopMap = new Map();
// 统一响应回调方法
const responseCallback = (name, data) => {
    var _a;
    if (!registerLoopMap.has(name))
        return;
    (_a = registerLoopMap.get(name)) === null || _a === void 0 ? void 0 : _a.responseCallback(data, name);
};
// 统一响应回调方法代理
const responseCallbackProxy = comlink_1.proxy(responseCallback);
// worker线程暴露对象
const workerApi = comlink_1.wrap(new loop_worker_1.default());
const init = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield workerApi.responseCallback(responseCallbackProxy);
});
const registerLooper = (name, config) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const ret = yield workerApi.registerLooper(name, config.looperConfig);
    if (ret)
        registerLoopMap.set(name, config);
    return ret;
});
const startLooper = (name) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const ret = yield workerApi.startLooper(name);
    return ret;
});
const stopLooper = (name) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const ret = yield workerApi.stopLooper(name);
    return ret;
});
const destroyLooper = (name) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const ret = yield workerApi.destroyLooper(name);
    return ret;
});
exports.BgLooper = {
    init,
    registerLooper,
    startLooper,
    stopLooper,
    destroyLooper
};
