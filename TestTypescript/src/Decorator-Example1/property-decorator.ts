
//     function Emoji(target:Object,key:string) {
//         console.log(target[])
//         // return function(target:Object,key:string,desc:PropertyDescriptor){
//         //     // let val = target[key]
//         //     // console.log(target[])
//         //     console.log(desc.value)
//         // }
//     }


// class IceCreamComponent {
//     @Emoji
//     public flavor = 'vanilla';
// }



// // Decorator function 
// function log(target: Function, type: string, descriptor: PropertyDescriptor) {
//     let value = descriptor.value;
//     descriptor.value = function(a: number, b: number) {
//     let result = value(a, b);
//     console.log(' journal ：', {type,a,b,result
//     })
//     return result;
//     }
//     }

//     // Original class 
//     class M {
//     @log
//     static add(a: number, b: number) {
//     return a + b;
//     }
//     @log
//     static sub(a: number, b: number) {
//     return a - b;
//     }
//     }
//     let v1 = M.add(1, 2);
//     console.log(v1);
//     let v2 = M.sub(1, 2);
//     console.log(v2);

// Decorator function 
function log(callback: Function) {
return function(target: Function, type: string, descriptor: PropertyDescriptor) {
let value = descriptor.value;
descriptor.value = function(a: number, b: number) {
let result = value(a, b);
callback({type,a,b,result});
return result;
}
}
}
// Original class 
class M {
@log(function(result: any) {
console.log(' journal ：', result)
})
static add(a: number, b: number) {
return a + b;
}
@log(function(result: any) {
    // localStorage.setItem('log', JSON.stringify(result));
    console.log('local',result)
})
static sub(a: number, b: number) {
return a - b;
}
}
let v1 = M.add(1, 2);
console.log(v1);
let v2 = M.sub(1, 2);
console.log(v2);