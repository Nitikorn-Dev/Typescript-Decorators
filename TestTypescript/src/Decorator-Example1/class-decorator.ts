
@Fronzen
class IceCream {}


function Fronzen(constructor:Function){
    Object.freeze(constructor);
    Object.freeze(constructor.prototype);
}

console.log(Object.isFrozen(IceCream))
class FroYo extends IceCream {}