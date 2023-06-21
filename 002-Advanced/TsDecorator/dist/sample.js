"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecoratorSample = void 0;
const classDecorator = (target) => {
    console.log(`Call class decorator, class name: '${target.name}'`);
};
const methodDecorator = (target, propertyKey, decorator) => {
    console.log(`Call method decorator, method name: '${propertyKey}'`);
};
const accessorDecorator = (target, propertyKey, descriptor) => {
    console.log(`Call accessor decorator, accessor name: '${propertyKey}'`);
};
const propertyDecorator = (target, propertyKey) => {
    console.log(`Call property decorator, property name: '${propertyKey}'`);
};
const parameterDecorator = (target, propertyKey, index) => {
    console.log(`Call parameter decorator, parameter[${index}]: '${propertyKey}'`);
};
let DecoratorSample = class DecoratorSample {
    constructor(id, name) {
        this._id = id;
        this._name = name;
    }
    getValue(id) {
        return this._name;
    }
    get id() {
        return this._id;
    }
};
__decorate([
    propertyDecorator,
    __metadata("design:type", Number)
], DecoratorSample.prototype, "_id", void 0);
__decorate([
    propertyDecorator,
    __metadata("design:type", String)
], DecoratorSample.prototype, "_name", void 0);
__decorate([
    methodDecorator,
    __param(0, parameterDecorator),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DecoratorSample.prototype, "getValue", null);
__decorate([
    accessorDecorator,
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], DecoratorSample.prototype, "id", null);
DecoratorSample = __decorate([
    classDecorator,
    __metadata("design:paramtypes", [Number, String])
], DecoratorSample);
exports.DecoratorSample = DecoratorSample;
//# sourceMappingURL=sample.js.map