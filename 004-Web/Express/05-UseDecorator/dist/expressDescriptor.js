"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressRegister = exports.Params = exports.Query = exports.Body = exports.Headers = exports.createRequestParamDecorator = exports.HttpDelete = exports.HttpPut = exports.HttpPost = exports.HttpGet = exports.createHttpActionMappingDecorator = exports.Controller = void 0;
const express_1 = require("express");
require("reflect-metadata");
//--------------------------------------------------
// 設定 Decorator with Reflect Metadata
//--------------------------------------------------
const CONTROLLER_METADA = 'controller';
const METHOD_METADATA = 'method';
const PATH_METADATA = 'path';
const PARAMS_METADATA = "params";
const Controller = (path = '') => {
    return (target) => {
        Reflect.defineMetadata(CONTROLLER_METADA, path, target);
    };
};
exports.Controller = Controller;
const createHttpActionMappingDecorator = (method = 'get') => (path = '') => {
    return (target, propertyKey, descriptor) => {
        Reflect.defineMetadata(METHOD_METADATA, { method, path }, descriptor.value);
    };
};
exports.createHttpActionMappingDecorator = createHttpActionMappingDecorator;
exports.HttpGet = (0, exports.createHttpActionMappingDecorator)('get');
exports.HttpPost = (0, exports.createHttpActionMappingDecorator)('post');
exports.HttpPut = (0, exports.createHttpActionMappingDecorator)('put');
exports.HttpDelete = (0, exports.createHttpActionMappingDecorator)('delete');
const createRequestParamDecorator = (type) => (key) => {
    return (target, propertyKey, index) => {
        const preMetadata = Reflect.getMetadata(PARAMS_METADATA, target, propertyKey) || [];
        const newMetadata = [{ key, index, type }, ...preMetadata];
        Reflect.defineMetadata(PARAMS_METADATA, newMetadata, target, propertyKey);
    };
};
exports.createRequestParamDecorator = createRequestParamDecorator;
exports.Headers = (0, exports.createRequestParamDecorator)('headers');
exports.Body = (0, exports.createRequestParamDecorator)('body');
exports.Query = (0, exports.createRequestParamDecorator)('query');
exports.Params = (0, exports.createRequestParamDecorator)('params');
//--------------------------------------------------
// 設定 Express
//--------------------------------------------------
class ExpressRegister {
    static register(app, controllers) {
        const router = (0, express_1.Router)();
        for (let controller of controllers) {
            let controllerMetadata = Reflect.getMetadata(CONTROLLER_METADA, controller.constructor);
            const prototype = Object.getPrototypeOf(controller);
            // 取出 Controller 的 Method
            const methods = Object.getOwnPropertyNames(prototype)
                .filter(n => n !== 'constructor' &&
                typeof prototype[n] === 'function');
            for (let method of methods) {
                let methodMetdata = Reflect.getMetadata(METHOD_METADATA, prototype[method]);
                if (methodMetdata) {
                    let httpMethod = methodMetdata.method;
                    let path = methodMetdata.path;
                    if (methodMetdata) {
                        let methodFunc = prototype[method];
                        let route = controllerMetadata + path;
                        router[httpMethod](route, (req, res, next) => {
                            methodFunc(req, res, next);
                        });
                    }
                }
            }
        }
        app.use(router);
        return app;
    }
}
exports.ExpressRegister = ExpressRegister;
const extractParameters = (req, res, next, paramArr = [], parseArr = []) => {
    if (!paramArr.length) {
        return [req, res, next];
    }
    const args = [];
    paramArr.forEach(param => {
        const { key, index, type } = param;
        switch (type) {
            case 'query':
                args[index] = key ? req.query[key] : req.query;
                break;
            case 'params':
                args[index] = key ? req.params[key] : req.params;
                break;
            case 'body':
                args[index] = key ? req.body[key] : req.body;
                break;
            case 'headers':
                args[index] = key ? req.headers[key.toLowerCase()] : req.headers;
                break;
        }
    });
    parseArr.forEach(parse => {
        const { type, index } = parse;
        switch (type) {
            case 'number':
                args[index] = +args[index];
                break;
            case 'string':
                args[index] = args[index] + '';
                break;
            case 'boolean':
                args[index] = Boolean(args[index]);
                break;
        }
    });
    args.push(req, res, next);
    return args;
};
//# sourceMappingURL=expressDescriptor.js.map