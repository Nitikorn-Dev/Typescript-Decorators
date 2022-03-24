function CarDecorator(constructor:Function){
    constructor.prototype.date = new Date();
}

function OtherDecorator(name:string){
    if(name === 'admin'){
        return function(constructor:Function){
            constructor.prototype.admin = true;
            constructor.prototype.alert = function() {
                alert(`is Admin : ${this.date}`);
            }
        }
    }else{
        return function(constructor:Function){
            constructor.prototype.admin = false;
        }
    }
}

@OtherDecorator('admin')
@CarDecorator
export class Car {
    brand!:string;
    declare date:Date;
    declare admin:boolean;
    constructor(brand:string){
        this.brand = brand;
    }
}