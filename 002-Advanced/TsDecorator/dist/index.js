var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function classDecorator(target) {
    console.log(`Call class decorator, class name: '${target.name}'`);
}
function methodDecorator(target, name, decorator) {
    console.log(`Call method decorator, method name: '${name}'`);
}
function propertyDecorator(target, name) {
    console.log(`Call property decorator, property name: '${name}'`);
}
function parameterDecorator(target, name, index) {
    console.log(`Call parameter decorator, parameter[${index}]: '${name}'`);
}
let MyClass = class MyClass {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    getValue(id) {
        return this.name;
    }
};
__decorate([
    propertyDecorator
], MyClass.prototype, "id", void 0);
__decorate([
    propertyDecorator
], MyClass.prototype, "name", void 0);
__decorate([
    methodDecorator,
    __param(0, parameterDecorator)
], MyClass.prototype, "getValue", null);
MyClass = __decorate([
    classDecorator
], MyClass);
var myClass = new MyClass(1, 'hello');
myClass.getValue(1);
//# sourceMappingURL=index.js.map