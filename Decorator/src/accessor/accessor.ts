export{Accessor as DA};

namespace Accessor {    
    export function Immutable(
        target:any,
        propertyKey:string|symbol,
        desc:PropertyDescriptor){
            let original = desc.set;
            desc.set = function(value:any){
                return original?.call(this,{...value})
            }
    }

}