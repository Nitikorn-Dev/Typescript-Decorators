import { DecoratorP } from './decorators/property.js';
const Prop = DecoratorP.Prop;

class App {
    @Prop()
    name:string = 'app1'
}

const app = new App();
console.log(app.name)