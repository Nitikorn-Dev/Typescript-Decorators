
function Uppercase(target:Object,name:string,desc:PropertyDescriptor){
    return {
        enumerable:false,
        configurable:false,
        get:function(){
            return desc.get?.call(this).toUpperCase();
        },
        set:function(name:string){
            console.log(name)
            desc.set?.call(this,name.split(' '));
        }
    }
}

class Student {
    constructor(
        public name:string,
        public last:string
    ){}
    
    @Uppercase
    get fullname():string {
        return this.name+' '+this.last;
    }
    
    set fullname([name,last]){
        this.name = name;
        this.last = last;
    }

    
}

const std1 = new Student('std1','last');

console.log(std1.fullname)
std1.fullname = 'std2 last2';
console.log(std1.fullname)