import "reflect-metadata";
export declare const Controller: (path?: string) => ClassDecorator;
export declare const createHttpActionMappingDecorator: (method?: string) => (path?: string) => MethodDecorator;
export declare const HttpGet: (path?: string) => MethodDecorator;
export declare const HttpPost: (path?: string) => MethodDecorator;
export declare const HttpPut: (path?: string) => MethodDecorator;
export declare const HttpDelete: (path?: string) => MethodDecorator;
export declare const createRequestParamDecorator: (type: any) => (key?: string) => ParameterDecorator;
export declare const Headers: (key?: string) => ParameterDecorator;
export declare const Body: (key?: string) => ParameterDecorator;
export declare const Query: (key?: string) => ParameterDecorator;
export declare const Params: (key?: string) => ParameterDecorator;
export declare class ExpressRegister {
    static register(app: any, controllers: any[]): any;
}
