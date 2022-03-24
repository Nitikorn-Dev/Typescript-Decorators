
function Myclass(){}
var value;
// Object.defineProperty(Myclass.prototype,'e',{
//     get(){
//         return value;
//     },
//     set(x){
//         value = x;
//     }
// })
// let ins1 = new Myclass();
// let ins2 = new Myclass();

// ins1.name = 'user1'
// ins1.age = 2;
// console.log(ins1.e);
// console.log(ins2.e);

function myclass(){}

Object.defineProperty(myclass.prototype,'s',{
    get(){
        return this.stored_s;
    },
    set(x){
        this.stored_s = x;
    }
});

let inst3 = new myclass();
let inst4 = new myclass();
inst3 = 3;
console.log(inst3)
console.log(inst4)
