//Example 1

function version(version:string){
    return function(target:any){
        target.version = version;
    }
}

@version('v2.0.1')
class Person {
    fname!:string;
    lname!:string;
    constructor(fname:string,lname:string){
        this.fname = fname;
        this.lname = lname;
    }

    getFullname(){
        return this.fname+' '+this.lname;
    }
}

console.log('version ->',(Person as any).version)


//Example 2

function DecoratorFactory(label:string){
    console.log('factory():',label);
    return function(...args:any[]){
        console.log('decorator():',label);
    }
}

function Decorator(...args:any[]){
    console.log('decorator():','param-B')
}


@DecoratorFactory('class-A')
@DecoratorFactory('class-B')
@DecoratorFactory('class-C')
class Person2 {
    constructor(
        @DecoratorFactory('param-A') @Decorator
        @DecoratorFactory('param-c') public name:string
    ){}
}

//Example 3

function factory(label:string){
        console.log('factory():',label);
    return function (...args:any[]){
        console.log('decorator():',label);
    }
}

@factory('class')
class Person3 {
    @factory('poperty-instance') public name!:string;
    @factory('poperty-static') static version:string;

    constructor(
        @factory('param-constructor') name:string
    ) {
        this.name = name;
    }

    @factory('method-instance')
    getName( @factory('param-instance') prefix:string) {
        return prefix+' '+this.name;
    }
    @factory('getter-instance')
    get personName(){
        return this.name;
    }

    @factory('method-static')
    static getVersion(@factory('param-static') prefix:string){
        return prefix+' '+this.version;
    }

    @factory('getter-static')
    static personVersion(){
        return this.version;
    }
}

//Example 4 
import 'reflect-metadata';
 function noop(...args:any[]){}

 class Person4 {
     constructor(
         public name:string,
         public age:number
     ){}
     getAge(){return this.age.toString();}

    @noop
    getNameWithPrefix(prefix:string){
    const type = Reflect.getMetadata('design:type',this,'getNameWithPrefix')
    console.log('type ->',type);

    const paramstype = Reflect.getMetadata('design:paramtypes',this,'getNameWithPrefix');
    console.log('paramtypes ->',paramstype);
  
    const returntype = Reflect.getMetadata('design:returntype',this,'getNameWithPrefix');
    console.log('returntypes ->',paramstype);

    return prefix+' '+this.name;
    }
 }

 var person4 = new Person4('Niti',24);
 person4.getNameWithPrefix('Dr.');