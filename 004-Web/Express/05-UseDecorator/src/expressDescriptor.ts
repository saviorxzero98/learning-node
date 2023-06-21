import { NextFunction, Router } from 'express';
import "reflect-metadata";

//--------------------------------------------------
// 設定 Decorator with Reflect Metadata
//--------------------------------------------------

const CONTROLLER_METADA = 'controller';
const METHOD_METADATA = 'method';
const PATH_METADATA = 'path';
const PARAMS_METADATA = "params";

export const Controller = (path: string = ''): ClassDecorator => {
    return (target) => {
        Reflect.defineMetadata(CONTROLLER_METADA, path, target);
    }
}

export const createHttpActionMappingDecorator = (method: string = 'get') => (path: string = ''): MethodDecorator => {
    return (target, propertyKey, descriptor) => {
        Reflect.defineMetadata(METHOD_METADATA, { method, path }, descriptor.value);
    }
}

export const HttpGet = createHttpActionMappingDecorator('get');
export const HttpPost = createHttpActionMappingDecorator('post');
export const HttpPut = createHttpActionMappingDecorator('put');
export const HttpDelete = createHttpActionMappingDecorator('delete');


export const createRequestParamDecorator = (type: any) => (key?: string): ParameterDecorator => {
    return (target, propertyKey, index) => {
        const preMetadata = Reflect.getMetadata(PARAMS_METADATA, target, propertyKey) || [];
        const newMetadata = [{ key, index, type }, ...preMetadata];
        Reflect.defineMetadata(PARAMS_METADATA, newMetadata, target, propertyKey);
    };
}

export const Headers = createRequestParamDecorator('headers');
export const Body = createRequestParamDecorator('body');
export const Query = createRequestParamDecorator('query');
export const Params = createRequestParamDecorator('params');


//--------------------------------------------------
// 設定 Express
//--------------------------------------------------

export class ExpressRegister {
    public static register(app: any, controllers : any[]) {
        const router = Router();
    
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

const extractParameters = (req: any, res: any, next: any, paramArr: any[] = [], parseArr: any[] = []) => {
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
                args[index] = + args[index];
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
}