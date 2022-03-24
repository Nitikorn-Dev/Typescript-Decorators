"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Container = /** @class */ (function () {
    function Container() {
    }
    Container.register = function (key, instance) {
        if (!Container.registry.has(key)) {
            Container.registry.set(key, instance);
            console.log("Added " + key + " to the registry");
        }
    };
    Container.get = function (key) {
        return Container.registry.get(key);
    };
    Container.registry = new Map();
    return Container;
}());
function InjectionTarget() {
    return function injectionTarget(constructor) {
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = this;
                //@ts-ignore
                var injections = constructor.injections;
                console.log(constructor.injections);
                var injectedArgs = injections.map(function (_a) {
                    var key = _a.key;
                    console.log("Injecting an instance indentified by key " + key);
                    return Container.get(key);
                });
                console.log(injectedArgs);
                _this = _super.apply(this, injectedArgs) || this;
                return _this;
            }
            return class_1;
        }(constructor));
    };
}
function Inject(key) {
    return function (target, propertyKey, paramiterIndex) {
        var injection = { index: paramiterIndex, key: key };
        //@ts-ignore
        var existingInjections = target.injections || [];
        existingInjections[paramiterIndex] = injection;
        Object.defineProperty(target, "injections", {
            enumerable: false,
            configurable: true,
            writable: false,
            value: __spreadArray([], existingInjections, true),
        });
    };
}
var UserRepository = /** @class */ (function () {
    function UserRepository() {
    }
    UserRepository.prototype.findAllUser = function () {
        return [{ name: "user1" }, { name: "user2" }];
    };
    return UserRepository;
}());
var Person = /** @class */ (function () {
    function Person() {
    }
    Person.prototype.findPerson = function () {
        return [{ name: "person1" }, { name: "person2" }];
    };
    return Person;
}());
var UserService = /** @class */ (function () {
    function UserService(userRepository, person, name) {
        this.name = name;
        if (!userRepository)
            throw Error("No UserRepository provided or injected.");
        if (!person)
            throw Error("No UserRepository provided or injected.");
        this.userRepository = userRepository;
        this.person = person;
    }
    UserService.prototype.getAllUser = function () {
        return this.userRepository.findAllUser();
    };
    UserService.prototype.getPersonAll = function () {
        return this.person.findPerson();
    };
    UserService = __decorate([
        InjectionTarget(),
        __param(0, Inject("UserRepository")),
        __param(1, Inject("Person")),
        __metadata("design:paramtypes", [UserRepository,
            Person, String])
    ], UserService);
    return UserService;
}());
Container.register("UserRepository", new UserRepository());
Container.register("Person", new Person());
var userService = new UserService();
console.log(userService);
console.log(userService.getAllUser());
console.log(userService.getPersonAll());
