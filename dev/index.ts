import { BgLooper } from '../src/bg-looper'

async function init(): Promise<void> {

  let ret = false;
  await BgLooper.init();
  ret = await BgLooper.registerLooper('looperA', {
    name: 'looperA',
    // todo: 增加泛型
    responseCallback(data: unknown, ...rest: unknown[]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log(`lopper [${rest[0]}] receive response ${(data as any).id} - ${(data as any).title}`)
    },
    looperConfig: {
      id: 'looperA',
      interval: 1000,
      requestConfig: {
        url: 'https://jsonplaceholder.typicode.com/todos/1'
      }
    }
  });
  console.log(`init looperA: ${ret}`);

  ret = await BgLooper.registerLooper('looperB', {
    name: 'looperB',
    responseCallback(data, ...rest: unknown[]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log(`lopper [${rest[0]}] receive response ${(data as any).id} - ${(data as any).title}`)
    },
    looperConfig: {
      id: 'looperB',
      interval: 2000,
      requestConfig: {
        url: 'https://jsonplaceholder.typicode.com/todos/2'
      }
    }
  });
  console.log(`init looperB: ${ret}`);

  ret = await BgLooper.startLooper('looperA');
  console.log(`start looperA: ${ret}`);

  ret = await BgLooper.startLooper('looperB');
  console.log(`start looperB: ${ret}`);

}

init();