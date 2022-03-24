//Reference https://youtu.be/oF7m5ibwzAw

//Class
function Component(constructor:Function){
    constructor.prototype.id = 100;
}

//Property Static
function SPropertyDecorator(options:{id:string}) {
    return function(target:Function & typeof TestClass){
        target.elementId = options.id;
    }
}

//Property Instance
function Prop(target:Object,propertyKey:string){
    let val:number;
    const getter =()=> {
        console.log(`Getting value...`);
        return val;
    };
    const setter =(newVal:number)=> {
        console.log(`Setting value ot ${newVal}`);
        val = newVal;
    }
    Object.defineProperty(target,propertyKey,{
        get:getter,
        set:setter
    })
}
//Param
function Param(target:Object,propertyKey:string,index:number){
    console.log(`Param: ${propertyKey} index:`,index);
}

// Method Instance
function IMethodDecorator(target:Object,key:string,desc:PropertyDescriptor) {
    desc.value = function(...args:any[]) {
        return `Hello ${args}`
    }
};

@SPropertyDecorator({id:'hello'})
@Component
export class TestClass {
    static elementId:string;

    @Prop
    id!:number;

    @IMethodDecorator
    printId(@Param prefix:string = ''){
        // return prefix+this.id
    }
}

