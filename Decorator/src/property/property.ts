
import 'reflect-metadata';
export{Property as DP};

function capitalizeFirstLeter(str:string){
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}
namespace Property {
    export function Observable(){
        return function(target:any,propertyKey:string){
            const targetKey = `on${capitalizeFirstLeter(propertyKey)}Change`;
            target[targetKey] = function(callback:(prev:any,next:any)=>void){
                let prev = this[propertyKey];
                Object.defineProperty(this,propertyKey,{
                    set(next){
                        callback(prev,next);
                        prev = next;
                    }
                })
            }
        }
    }

    export function Prop(){
        return function(target:any,propertyKey:string){
            let val:string;
            let getter =()=>{
                console.log(`Getting value...`);
                return val;
            }
            let setter =(newValule:string)=>{
                console.log(`Setting value...`);
                val = newValule;
            }
            Object.defineProperty(target,propertyKey,{
                
                get:getter,
                set:setter
            })
        }
    }
}