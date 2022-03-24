import { performance  } from "perf_hooks";

import 'reflect-metadata';
const importantMetadataKey = Symbol('important');

export function important(target:Object,propertyKey:string,paramiterIndex:number){
        let existingRequiredParamiters:number[] =
        Reflect.getOwnMetadata(importantMetadataKey,target,propertyKey)||[];
        existingRequiredParamiters.push(paramiterIndex);
        Reflect.defineMetadata(
            importantMetadataKey,
            existingRequiredParamiters,
            target,
            propertyKey,
            );
    }


export function LogTiming<T extends {new(...args:any[]):{}}>(constructor:T){
    return class extends constructor {
        __timings:number[] = [];
        printTimings = ()=> {
            console.log(this.__timings);
        }
    }
}

interface ThisWithTimings {
    __timings:unknown[];
}

export function Timing(){
    return function(target:any,propertyKey:string,desciptor:PropertyDescriptor){
        let value = desciptor.value;
        desciptor.value = async function(...args:any[]){
            let start = performance.now();
            let out = await value.apply(this,args);
            let end = performance.now();

            let importantParams:unknown[] =[];
            let importantParameters:number[] = Reflect.getOwnMetadata(
                importantMetadataKey,
                target,
                propertyKey
            );

            if(importantParameters){
                for(let paramiterIndex of importantParameters){
                    // console.log(args[paramiterIndex])
                    importantParams.push(args[paramiterIndex]);
                }
            }
// console.log(importantParams)
            if((this as ThisWithTimings).__timings) {
                (this as ThisWithTimings).__timings.push({method:propertyKey,time:end - start,importantParams});
            }else {
                console.log(end - start);
            }
            return out;
        }
    }
}