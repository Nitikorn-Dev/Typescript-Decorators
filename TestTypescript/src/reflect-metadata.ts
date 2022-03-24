
// interface Fullname<T> {
//     fname?:T;
//     lname?:T;
// }

// import 'reflect-metadata';
 
// function textCase(target:Object,name:string) {
//     const tcase = name === 'fname'?'upper':'lower';
//     Reflect.defineMetadata('case', tcase, target, name);
// }

// function getTextCase(target:Object,name:string):'upper'|'lower' {

//     return Reflect.getMetadata('case',target,name);
// }
// const a:string = 'A of Host';

// class Person {
//     @textCase
//     public fname:string;

//     @textCase
//     public lname:string;

    
//     constructor(fname:string,lname:string,public a:string = Person.name+fname){
//         this.fname = fname;
//         this.lname = lname;
//     }
//     get fullname():string{
//         const fullname:Fullname<string> = {};
//         fullname.fname = getTextCase(this,'fname') === 'upper'?this.fname.toUpperCase():this.fname.toLowerCase();
//         fullname.lname = getTextCase(this,'lname') === 'upper'?this.lname.toUpperCase():this.lname.toLowerCase();
//         return fullname.fname+''+fullname.lname;
//     }
//     dispay = async <T>(callback:(x:T)=>string,p:T):Promise<string> => {
//         return typeof p === 'string'? new Promise((res)=>res(callback(p))):new Promise((res,rej)=>rej('error Type'));
//     }
//     showData!:(x:this)=>any;
// }

// class Base extends Person {}

// var base = new Base('Base','LaseBase');

// var person1 = new Person('Ross','Geller');
// var person2 = new Person('Ross2','Geller2');
// person1.fullname;


// (async function(){
//     let result;
//     try{
//         return  result = await person2.dispay((x)=>{console.log(x); return `hello: ${x}`},'nitikorn')
//     }catch(err){
//         console.log(err)
//     }
    
// }())