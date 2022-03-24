class Container {
  private static registry: Map<string, any> = new Map();
  static register(key: string, instance: any) {
    if (!Container.registry.has(key)) {
      Container.registry.set(key, instance);
      console.log(`Added ${key} to the registry`);
    }
  }

  static get(key: string) {
    return Container.registry.get(key);
  }
}

interface Injection {
  index: number;
  key: string;
}

interface Constructor {
  new (...args: any[]): {};
}

function InjectionTarget() {
  return function injectionTarget<T extends Constructor>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        //@ts-ignore
        const injections = constructor.injections as Injection[];
        console.log((constructor as any).injections);
        const injectedArgs: any[] = injections.map(({ key }) => {
          console.log(`Injecting an instance indentified by key ${key}`);
          return Container.get(key);
        });
        console.log(injectedArgs);
        super(...injectedArgs);
      }
    };
  };
}

function Inject(key: string) {
  return function (
    target: Object,
    propertyKey: string | symbol,
    paramiterIndex: number
  ) {
    const injection = { index: paramiterIndex, key };
    //@ts-ignore
    const existingInjections: Injection[] = target.injections || [];
    existingInjections[paramiterIndex] = injection;
    Object.defineProperty(target, "injections", {
      enumerable: false,
      configurable: true,
      writable: false,
      value: [...existingInjections],
    });
  };
}

interface User {
  name: string;
}

class UserRepository {
  findAllUser(): User[] {
    return [{ name: "user1" }, { name: "user2" }];
  }
}

class Person {
  findPerson() {
    return [{ name: "person1" }, { name: "person2" }];
  }
}

@InjectionTarget()
class UserService {
  userRepository: UserRepository;
  person: Person;
  constructor(
    @Inject("UserRepository") userRepository?: UserRepository,
    @Inject("Person") person?: Person,
    public name?: string
  ) {
    if (!userRepository) throw Error("No UserRepository provided or injected.");
    if (!person) throw Error("No UserRepository provided or injected.");
    this.userRepository = userRepository;
    this.person = person;
  }

  getAllUser(): User[] | undefined {
    return this.userRepository.findAllUser();
  }

  getPersonAll() {
    return this.person.findPerson();
  }
}

Container.register("UserRepository", new UserRepository());
Container.register("Person", new Person());

const userService = new UserService();

console.log(userService);
console.log(userService.getAllUser());
console.log(userService.getPersonAll());
