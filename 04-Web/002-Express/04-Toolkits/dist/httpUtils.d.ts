/// <reference types="node" />
import * as express from 'express';
import { Stream } from 'stream';
export declare class HttpResponse {
    private _res;
    constructor(res: express.Response);
    /** Create HttpResponse */
    static create(res: express.Response): HttpResponse;
    /** Send Text */
    text(text: string, contentType?: string): HttpResponse;
    /** Send JSON */
    json(data: any): HttpResponse;
    /** Send File (Stream) */
    fileStream(stream: Stream, fileName: string, contentType?: string): void;
    /** Send File */
    file(filePath: string, fileName: string, contentType?: string): void;
    /** End Response */
    end(): void;
}
export declare class HttpRequest {
    private _req;
    constructor(res: express.Request);
    /** 建立 Request Parser */
    static create(req: express.Request): HttpRequest;
    getBody(): any;
}
export declare class RequestHeaderHelper {
    readonly authorizationKey: string;
    private _headers;
    constructor(headers: any);
    /** 取出 Header 指定欄位的值 */
    getHeader(searchKey: string): {
        key?: string;
        value?: string;
    };
    /** 取出 Header Authorization 的值 */
    getAuthorization(): string;
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
export declare enum ContentType {
    PlainText = "text/plain",
    Html = "text/html",
    XmlFile = "text/xml",
    Css = "text/css",
    Csv = "text/csv",
    Json = "application/json",
    Xml = "application/xml",
    Pdf = "application/pdf",
    Zip = "application/zip",
    JavaScript = "application/javascript",
    Binary = "application/octet-stream",
    FormUrlEncoded = "application/x-www-form-urlencoded",
    FormData = "multipart/form-data",
    ImageGif = "image/gif",
    ImageJpeg = "image/jpeg",
    ImagePng = "image/png",
    AudioMp3 = "audio/mpeg",
    VideoMp4 = "video/mp4"
}
