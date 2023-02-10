"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentType = exports.HttpStatusCodeUtils = exports.HttpStatusCode = exports.RequestHeaderHelper = exports.HttpRequest = exports.HttpResponse = void 0;
const html_entities_1 = require("html-entities");
class HttpResponse {
    constructor(res) {
        this._res = res;
    }
    /** Create HttpResponse */
    static create(res) {
        return new HttpResponse(res);
    }
    /** Send Text */
    text(text, contentType = ContentType.PlainText) {
        this._res.set('Content-Type', contentType);
        this._res.status(HttpStatusCode.OK_200).send(html_entities_1.encode(text));
        return this;
    }
    /** Send JSON */
    json(data) {
        //let json = JSON.stringify(data);
        //let raw = encode(json);
        //this._res.set('Content-Type', ContentType.Json);
        //this._res.status(HttpStatusCode.OK_200).send(raw);
        this._res.set('Content-Type', ContentType.Json);
        this._res.status(HttpStatusCode.OK_200).json(data);
        return this;
    }
    /** Send File (Stream) */
    fileStream(stream, fileName, contentType = ContentType.Binary) {
        this._res.set('Content-Disposition', `attachment; filename=${encodeURIComponent(fileName)}`);
        this._res.set('Content-Type', contentType || ContentType.Binary);
        stream.pipe(this._res);
    }
    /** Send File */
    file(filePath, fileName, contentType = ContentType.Binary) {
        this._res.set('Content-Disposition', `attachment; filename=${encodeURIComponent(fileName)}`);
        this._res.set('Content-Type', contentType || ContentType.Binary);
        this._res.status(HttpStatusCode.OK_200).sendFile(filePath);
    }
    /** End Response */
    end() {
        this._res.end();
    }
}
exports.HttpResponse = HttpResponse;
class HttpRequest {
    constructor(res) {
        this._req = res;
    }
    /** 建立 Request Parser */
    static create(req) {
        return new HttpRequest(req);
    }
    getBody() {
        if (this._req) {
            return this._req.body;
        }
        return null;
    }
}
exports.HttpRequest = HttpRequest;
class RequestHeaderHelper {
    constructor(headers) {
        this.authorizationKey = 'Authorization';
        this._headers = headers;
    }
    /** 取出 Header 指定欄位的值 */
    getHeader(searchKey) {
        let result = { key: '', value: '' };
        if (this._headers) {
            let keys = Object.keys(this._headers);
            let findKey = keys.find(k => k.toLowerCase() === searchKey.toLowerCase());
            if (findKey) {
                result.key = findKey;
                result.value = this._headers[findKey];
                return result;
            }
        }
        return result;
    }
    /** 取出 Header Authorization 的值 */
    getAuthorization() {
        if (this._headers) {
            return this.getHeader(this.authorizationKey).value;
        }
        return '';
    }
}
exports.RequestHeaderHelper = RequestHeaderHelper;
var HttpStatusCode;
(function (HttpStatusCode) {
    /** OK (200) */
    HttpStatusCode[HttpStatusCode["OK_200"] = 200] = "OK_200";
    /** Created (201) */
    HttpStatusCode[HttpStatusCode["Created_201"] = 201] = "Created_201";
    /** Accepted (202) */
    HttpStatusCode[HttpStatusCode["Accepted_202"] = 202] = "Accepted_202";
    /** Non Authoritative Information (203) */
    HttpStatusCode[HttpStatusCode["NonAuthoritativeInformation_203"] = 203] = "NonAuthoritativeInformation_203";
    /** No Content (204) */
    HttpStatusCode[HttpStatusCode["NoContent_204"] = 204] = "NoContent_204";
    /** Reset Content (205) */
    HttpStatusCode[HttpStatusCode["ResetContent_205"] = 205] = "ResetContent_205";
    /** Partial Content (206) */
    HttpStatusCode[HttpStatusCode["PartialContent_206"] = 206] = "PartialContent_206";
    /** Bad Request (400) */
    HttpStatusCode[HttpStatusCode["BadRequest_400"] = 400] = "BadRequest_400";
    /** Unauthorized (401) */
    HttpStatusCode[HttpStatusCode["Unauthorized_401"] = 401] = "Unauthorized_401";
    /** Payment Required (402) */
    HttpStatusCode[HttpStatusCode["PaymentRequired_402"] = 402] = "PaymentRequired_402";
    /** Forbidden (403) */
    HttpStatusCode[HttpStatusCode["Forbidden_403"] = 403] = "Forbidden_403";
    /** NotFound (404) */
    HttpStatusCode[HttpStatusCode["NotFound_404"] = 404] = "NotFound_404";
    /** Method Not Allowed (405) */
    HttpStatusCode[HttpStatusCode["MethodNotAllowed_405"] = 405] = "MethodNotAllowed_405";
    /** Conflict 409 */
    HttpStatusCode[HttpStatusCode["Conflict_409"] = 409] = "Conflict_409";
    /** Internal Server Error (500) */
    HttpStatusCode[HttpStatusCode["InternalServerError_500"] = 500] = "InternalServerError_500";
    /** Not Implemented (501) */
    HttpStatusCode[HttpStatusCode["NotImplemented_501"] = 501] = "NotImplemented_501";
    /** Bad Gateway (502) */
    HttpStatusCode[HttpStatusCode["BadGateway_502"] = 502] = "BadGateway_502";
    /** Service Unavailable (503) */
    HttpStatusCode[HttpStatusCode["ServiceUnavailable_503"] = 503] = "ServiceUnavailable_503";
})(HttpStatusCode = exports.HttpStatusCode || (exports.HttpStatusCode = {}));
class HttpStatusCodeUtils {
    /** Status Code is success */
    static isSuccessCode(statusCode) {
        return /^2\d\d$/.test(`${statusCode}`);
    }
    /** Status Code is not success */
    static isErrorCode(statusCode) {
        return !/^2\d\d$/.test(`${statusCode}`);
    }
    /** Status Code is client error */
    static isClientErrorCode(statusCode) {
        return /^4\d\d$/.test(`${statusCode}`);
    }
    /** Status Code is server error */
    static isServerErrorCode(statusCode) {
        return /^5\d\d$/.test(`${statusCode}`);
    }
}
exports.HttpStatusCodeUtils = HttpStatusCodeUtils;
var ContentType;
(function (ContentType) {
    // Text
    ContentType["PlainText"] = "text/plain";
    ContentType["Html"] = "text/html";
    ContentType["XmlFile"] = "text/xml";
    ContentType["Css"] = "text/css";
    ContentType["Csv"] = "text/csv";
    // Application
    ContentType["Json"] = "application/json";
    ContentType["Xml"] = "application/xml";
    ContentType["Pdf"] = "application/pdf";
    ContentType["Zip"] = "application/zip";
    ContentType["JavaScript"] = "application/javascript";
    ContentType["Binary"] = "application/octet-stream";
    ContentType["FormUrlEncoded"] = "application/x-www-form-urlencoded";
    ContentType["FormData"] = "multipart/form-data";
    // Image
    ContentType["ImageGif"] = "image/gif";
    ContentType["ImageJpeg"] = "image/jpeg";
    ContentType["ImagePng"] = "image/png";
    // Audio
    ContentType["AudioMp3"] = "audio/mpeg";
    // Video
    ContentType["VideoMp4"] = "video/mp4";
})(ContentType = exports.ContentType || (exports.ContentType = {}));
//# sourceMappingURL=httpUtils.js.map