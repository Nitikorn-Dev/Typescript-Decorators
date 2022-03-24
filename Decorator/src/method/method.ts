// <reference path="test.ts" />
export {Method as DM};
namespace Method {
    
    export function Timing(target:any,propertyKey:string|symbol,desc:PropertyDescriptor){
        let original = desc.value;
        desc.value = function(...args:any[]){
            let result = original.call(this,...args);
            console.log(result,new Date().toLocaleString());
        return result;
        }
    }
}