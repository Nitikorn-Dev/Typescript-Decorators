// interface Ctor {new (...arg:any[]):any}
            
// export function WithInfo<T extends Ctor>(ctor:T){
//     return class NewCtor extends ctor {
//         info(){
//             return `An instance of a "${ctor.name}".`;
//         }
//     }
// }

// export function Readonly(target:Object,name:string|symbol,desc:PropertyDescriptor) {
//     desc.writable = false;
// }
// export function Prefix(target:Object,name:string|symbol,desc:PropertyDescriptor) {
//     return {
//         writable:false,
//         enumerable:false,
//         configurable:false,
//         value:()=>`v ${desc.value()}`
//     }
// }

// @WithInfo
// class Person {
//     static version:number = 0.1;
//     constructor(public name:string,public last:string,age:number){}
//     @Readonly
//     getFullname(){
//         return `fullname is "${this.name} ${this.last}".`;
//     }
//     @Prefix
//     static getVersion(){
//         return Person.version.toString();
//     }
// }

// const inst1 = new Person('nitikorn','aiamart',24);
// console.log(inst1.getFullname());
// console.log((inst1 as any).info());
// console.log(inst1)

// console.log(Person.getVersion());