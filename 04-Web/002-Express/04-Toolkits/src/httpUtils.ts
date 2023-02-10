import * as express from 'express';
import { Stream } from 'stream';
import { encode } from 'html-entities';

export class HttpResponse {
    private _res: express.Response;

    constructor(res: express.Response) {
        this._res = res;
    }
    
    /** Create HttpResponse */
    public static create(res: express.Response): HttpResponse {
        return new HttpResponse(res);
    }

    /** Send Text */
    public text(text: string, contentType: string = ContentType.PlainText): HttpResponse {
        this._res.set('Content-Type', contentType);
        this._res.status(HttpStatusCode.OK_200).send(encode(text));
        return this;
    }

    /** Send JSON */
    public json(data: any): HttpResponse {
        //let json = JSON.stringify(data);
        //let raw = encode(json);
        //this._res.set('Content-Type', ContentType.Json);
        //this._res.status(HttpStatusCode.OK_200).send(raw);

        this._res.set('Content-Type', ContentType.Json);
        this._res.status(HttpStatusCode.OK_200).json(data);
        return this;
    }

    /** Send File (Stream) */
    public fileStream(stream: Stream, fileName: string, contentType: string = ContentType.Binary) {
        this._res.set('Content-Disposition', `attachment; filename=${encodeURIComponent(fileName)}` );
        this._res.set('Content-Type', contentType || ContentType.Binary);
        stream.pipe(this._res);
    }

    /** Send File */
    public file(filePath: string, fileName: string, contentType: string = ContentType.Binary) {
        this._res.set('Content-Disposition', `attachment; filename=${encodeURIComponent(fileName)}` );
        this._res.set('Content-Type', contentType || ContentType.Binary);
        this._res.status(HttpStatusCode.OK_200).sendFile(filePath);
    }

    /** End Response */
    public end() {
        this._res.end();
    }
}

export class HttpRequest {
    private _req: express.Request;

    constructor(res: express.Request) {
        this._req = res;
    }
    
    /** 建立 Request Parser */
    public static create(req: express.Request): HttpRequest {
        return new HttpRequest(req);
    }

    public getBody(): any {
        if (this._req) {
            return this._req.body;
        }
        return null;
    }
}

export class RequestHeaderHelper {
    public readonly authorizationKey: string = 'Authorization';
    private _headers: any;

    constructor(headers: any) {
        this._headers = headers;
    }

    /** 取出 Header 指定欄位的值 */
    public getHeader(searchKey: string): { key?: string, value?: string } {
        let result = { key: '', value: '' };
        if (this._headers) {
            let keys = Object.keys(this._headers);
            let findKey = keys.find(k => k.toLowerCase() === searchKey.toLowerCase());

            if (findKey) {
                result.key = findKey;
                result.value = this._headers[findKey]
                return result;
            }
        }
        return result;
    }

    /** 取出 Header Authorization 的值 */
    public getAuthorization(): string {
        if (this._headers) {
            return this.getHeader(this.authorizationKey).value;
        }
        return '';
    }
}

export enum HttpStatusCode {
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
    ServiceUnavailable_503 = 503,
}

export class HttpStatusCodeUtils {
    /** Status Code is success */
    public static isSuccessCode(statusCode: number): boolean {
        return /^2\d\d$/.test(`${statusCode}`);
    }

    /** Status Code is not success */
    public static isErrorCode(statusCode: number): boolean {
        return !/^2\d\d$/.test(`${statusCode}`);
    }

    /** Status Code is client error */
    public static isClientErrorCode(statusCode: number): boolean {
        return /^4\d\d$/.test(`${statusCode}`);
    }

    /** Status Code is server error */
    public static isServerErrorCode(statusCode: number): boolean {
        return /^5\d\d$/.test(`${statusCode}`);
    }
}

export enum ContentType {
    // Text
    PlainText = 'text/plain',
    Html = 'text/html',
    XmlFile = 'text/xml',
    Css = 'text/css',
    Csv = 'text/csv',

    // Application
    Json = 'application/json',
    Xml = 'application/xml',
    Pdf = 'application/pdf',
    Zip = 'application/zip',
    JavaScript = 'application/javascript',
    Binary = 'application/octet-stream',
    FormUrlEncoded = 'application/x-www-form-urlencoded',
    FormData = 'multipart/form-data',

    // Image
    ImageGif = 'image/gif',
    ImageJpeg = 'image/jpeg',
    ImagePng = 'image/png',

    // Audio
    AudioMp3 = 'audio/mpeg',

    // Video
    VideoMp4 = 'video/mp4'
}
