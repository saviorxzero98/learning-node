import * as express from 'express';
export declare class ResponseAction {
    private _res;
    constructor(res: express.Response);
    /** 建立 Response Action */
    static create(res: express.Response): ResponseAction;
    /** Response JSON 物件 */
    json(data: any): ResponseAction;
    /** Response File Stream */
    fileStream(filePath: string, fileName: string, contentType: string): void;
    /** Response File */
    file(filePath: string, fileName: string, contentType: string): void;
    /** End Response */
    end(): void;
}
export declare class RequestParser {
    private _req;
    constructor(res: express.Request);
    /** 建立 Request Parser */
    static create(req: express.Request): RequestParser;
    getBody(): any;
}
export declare enum HttpStatusCode {
    /** OK (200) */
    OK_200 = 200,
    /** Created (201) */
    Created_201 = 201,
    /** Accepted (202) */
    Accepted_202 = 202,
    /** Non Authoritative Information (203) */
    NonAuthoritativeInformation_203 = 203,
    /** No Content (204) */
    NoContent_204 = 204,
    /** Reset Content (205) */
    ResetContent_205 = 205,
    /** Partial Content (206) */
    PartialContent_206 = 206,
    /** Bad Request (400) */
    BadRequest_400 = 400,
    /** Unauthorized (401) */
    Unauthorized_401 = 401,
    /** Payment Required (402) */
    PaymentRequired_402 = 402,
    /** Forbidden (403) */
    Forbidden_403 = 403,
    /** NotFound (404) */
    NotFound_404 = 404,
    /** Method Not Allowed (405) */
    MethodNotAllowed_405 = 405,
    /** Conflict 409 */
    Conflict_409 = 409,
    /** Internal Server Error (500) */
    InternalServerError_500 = 500,
    /** Not Implemented (501) */
    NotImplemented_501 = 501,
    /** Bad Gateway (502) */
    BadGateway_502 = 502,
    /** Service Unavailable (503) */
    ServiceUnavailable_503 = 503
}
export declare class HttpStatusCodeUtils {
    /** Status Code is success */
    static isSuccessCode(statusCode: number): boolean;
    /** Status Code is not success */
    static isErrorCode(statusCode: number): boolean;
    /** Status Code is client error */
    static isClientErrorCode(statusCode: number): boolean;
    /** Status Code is server error */
    static isServerErrorCode(statusCode: number): boolean;
}
