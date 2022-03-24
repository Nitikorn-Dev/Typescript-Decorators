export function ParamDecorator(
    target:any,
    propertyKey:string,
    paramiterIndex:number
){
    console.log(target)
    console.log(propertyKey)
    console.log(paramiterIndex)
}


export class Tool {
    name:string;
    constructor(name:string){
        this.name = name;
    }

    price(){
        console.log('method price $200');
    }

    print(isTrue:string,@ParamDecorator isNumber:number){
        console.log('method print')
    }
}



