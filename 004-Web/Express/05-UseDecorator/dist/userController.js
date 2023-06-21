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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoController = void 0;
const expressDescriptor_1 = require("./expressDescriptor");
const memoryDatabase_1 = require("./memoryDatabase");
let DemoController = class DemoController {
    constructor() {
    }
    getUsers(req, res) {
        let users = memoryDatabase_1.InMemoryDatabase.getInstance()
            .getCollection('user')
            .find();
        res.status(200).send(users);
    }
    getUser(req, res) {
        let userId = req.query.userId;
        let user = memoryDatabase_1.InMemoryDatabase.getInstance()
            .getCollection('user')
            .findOne({ id: { '$gte': userId } });
        res.status(200).send(user);
    }
    postUser(req, res) {
        let user = req.body;
        memoryDatabase_1.InMemoryDatabase.getInstance()
            .getCollection('user').insert(user);
        res.status(200).send(`You post user: '${user.id}'`);
    }
    putUser(req, res) {
        let userId = req.query.userId;
        let user = req.body;
        if (userId && user && user['name']) {
            memoryDatabase_1.InMemoryDatabase.getInstance()
                .getCollection('user')
                .findAndUpdate({ id: { '$gte': userId } }, (record) => {
                record.name = user['name'];
            });
            res.status(200).send(`You Put users ${userId}`);
        }
        else {
            res.status(500);
        }
    }
    deleteUser(req, res) {
        let userId = req.query.userId;
        if (userId) {
            memoryDatabase_1.InMemoryDatabase.getInstance()
                .getCollection('user')
                .findAndRemove({ id: { '$gte': userId } });
            res.status(200).send(`You Delete users ${userId}`);
        }
        else {
            res.status(500);
        }
    }
};
__decorate([
    (0, expressDescriptor_1.HttpGet)('/users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DemoController.prototype, "getUsers", null);
__decorate([
    (0, expressDescriptor_1.HttpGet)('/users/:userId'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DemoController.prototype, "getUser", null);
__decorate([
    (0, expressDescriptor_1.HttpPost)('/users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DemoController.prototype, "postUser", null);
__decorate([
    (0, expressDescriptor_1.HttpPut)('/users/:userId'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DemoController.prototype, "putUser", null);
__decorate([
    (0, expressDescriptor_1.HttpDelete)('/users/:userId'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DemoController.prototype, "deleteUser", null);
DemoController = __decorate([
    (0, expressDescriptor_1.Controller)('/api'),
    __metadata("design:paramtypes", [])
], DemoController);
exports.DemoController = DemoController;
//# sourceMappingURL=userController.js.map