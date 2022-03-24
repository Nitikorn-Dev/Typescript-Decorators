import 'reflect-metadata';


function TextCase(target:Object,name:string,index:number){
    const tcase = index === 0 ? 'upper':'lower';
    Reflect.defineMetadata(`case_${index}`,tcase,target,name)
}

function getTextCase(target:Object,name:any,index:number){
    return  Reflect.getMetadata(`case_${index}`,target,name);
}

class Person {
    fname!:string;
    lname!:string;
    constructor(
        @TextCase fname:string,
        @TextCase lname:string
    ){
        this.fname = fname;
        this.lname = lname;
    }

    get fullname(){
        const fnameCase = getTextCase(Person,undefined,0)=== 'upper'? this.fname.toUpperCase():this.fname.toLowerCase();
        const lnameCase = getTextCase(Person,undefined,1)=== 'upper'? this.lname.toUpperCase():this.lname.toLowerCase();
        return fnameCase+' '+lnameCase;
    }
}

const person = new Person('Niti','Korn');
console.log(person.fullname);