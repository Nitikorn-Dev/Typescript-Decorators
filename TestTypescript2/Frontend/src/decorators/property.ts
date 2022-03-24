
export {DecoratorP};
namespace DecoratorP {
   export function Prop(){
        return (target:any,key:string|symbol)=> {

            let val = target[key];

            let getter =()=>{
                return val;
            }
            let setter =(newVal:string)=>{
                console.log('set',newVal)
                val = `**${newVal}**`;
            }

            Object.defineProperty(target,key,{
                get:getter,
                set:setter
            })
        }
    }
}

