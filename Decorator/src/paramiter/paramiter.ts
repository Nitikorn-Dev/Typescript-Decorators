export { Paramiter as DPAPAM };



namespace Paramiter {

export const IsInt = typeDecoratorFactory((x)=>Number.isInteger(x));

export const IsString = typeDecoratorFactory((x)=>typeof x === 'string');

type Validator = (x:any)=>boolean;

const validateMap: Record<string, Validator[]> = {};

function typeDecoratorFactory(varidator:Validator):ParameterDecorator{
        return function(_:any,key:string|symbol,index:number) {
          const target = validateMap[key as string]??[];
          target[index] = varidator;
          validateMap[key as string] = target;
        }
      }

export function validate(target:any,key:string,desc:PropertyDescriptor) {
        let original = desc.value;
      
        desc.value = function (...args:any[]) {
            let validatorList = validateMap[key];
            if(validatorList){
      
              args.forEach(( arg, index )=> {
      
                const validator = validatorList[index];
      
                if(!validator)return;
      
                const result = validator(arg);
      
                if(!result){
                  throw new Error(`Failed for parameter: ${arg} of the index: ${index}`);
                }
              });
            }
      
          return original.call(this,...args)
        }
      }
}