import { LogTiming, Timing, important } from "./Decorator01/method";
const delay = <T>(time: number, data: T): Promise<T> =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(data);
    }, time)
  );

@LogTiming
class Users {
  @Timing()
  async getUsers() {
    return await delay(1000, []);
  }
  @Timing()
  async getUser(a: string, @important id: number) {
    return await delay(50, {
      id: `user:${id}`,
    });
  }
}

(async function () {
  const users = new Users();

  const user = await users.getUser("", 22);
  console.log(`Got ${JSON.stringify(user)}`);

  await users.getUser("", 42);

  await users.getUsers();

  //@ts-ignore
  users?.printTimings();
})();
