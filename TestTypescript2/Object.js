//Ref https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
const Log = (fn) => {

console.log(fn);
  return function() {
    console.log("Logged at: " + new Date().toLocaleString());
    return fn();
  }
}

class Person {
    // a = Person.name;
  constructor(name, age) {
    this.name = name;
    this.age = age;

  }
  getBio=()=>{
    return this.name + ' ' + this.age+this.a
  }
}

const person = new Person('top',24);

const res = Log(person.getBio);
// const res = person.getBio;
console.log(res());



function List(){
    return Array.prototype.slice.call(arguments);
}
function Argument(arg1,arg2){
    return arg1+arg2;
}


const list = List(1,2,3,4);
console.log(list);
const loadingArg = List.bind(null,10);
console.log(loadingArg(1,2,3,4));

const argument = Argument(2,4);
console.log(argument);

const addParam = Argument.bind(null,50);
console.log(addParam(2));


function LateBloomer(){
    this.petaCount = Math.floor(Math.random()*12)+1;
}

LateBloomer.prototype.bloom = function (){
    setTimeout(this.declare.bind(this), 4000);
}

LateBloomer.prototype.declare = function() {
    console.log(`I am a beautiful flower with ${this.petalCount} petals!`);
  };


const flower = new LateBloomer();
flower.bloom();