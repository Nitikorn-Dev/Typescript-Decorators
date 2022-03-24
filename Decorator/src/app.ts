import { DP } from "./property/property.js";
import { DM } from "./method/method.js";
import { DA } from "./accessor/accessor.js";
import { DPAPAM } from "./paramiter/paramiter.js";
const Observable = DP.Observable;
const Prop = DP.Prop;
const Timing = DM.Timing;
const Immutable = DA.Immutable;
const IsInt = DPAPAM.IsInt;
const IsString = DPAPAM.IsString;
const Validate = DPAPAM.validate;

class App {
    // @Prop()
    @Observable()
    name: string;
    private _point: { a: number; b: number } = { a: 0, b: 0 };

    constructor(name: string) {
        this.name = name;
    }

    @Timing
    login(name: string, pass: number) {
        return { name, pass };
    }

    @Validate
    sayRepeat(@IsString word: string, @IsInt x: number) {
        return Array(x).fill(word).join(" ");
    }

    @Immutable
    get point() {
        return this._point;
    }
    set point(value: { a: number; b: number }) {
        this._point = value;
    }
}

const app = new App("app");
console.log(app);
//@ts-ignore
app.onNameChange((prev, next) => console.log(`prev:${prev} next:${next}`));
app.name = "app2";
app.name = "app3";

// app.login('user1',123);

let point = { a: 1, b: 1 };
app.point = point;
console.log(app.point === point);
console.log(app.point);

app.sayRepeat("hello", 2);

console.log(app);
