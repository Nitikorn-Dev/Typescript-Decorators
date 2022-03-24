
function PrintDecorator(target:any,property:string,descriptor:PropertyDescriptor){
    // console.log(target);
    // console.log(property);
    // console.log(descriptor);
}

function ToolsDecorator(){
    return function(target: Object, key: string | symbol) {

        let val = key;
    // console.log(target)
        const getter = () =>  {
            return val;
        };
        // const setter = (next) => {
        //     console.log('updating flavor...');
        //     val = `🍦 ${next} 🍦`;
        // };
    
        Object.defineProperty(target, key, {
          get: getter,
          set: function(x){},
          enumerable: true,
          configurable: true,
        });
    
      };
}


export class Tools {
    @ToolsDecorator()
    name:string;
    constructor(name:string){
        this.name = name;
    }

    price(){
        console.log('$ 200');
    }
    
    @PrintDecorator
    print(){
        console.log('print too');
    }
}
