"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatusCodeUtils = exports.HttpStatusCode = exports.RequestParser = exports.ResponseAction = void 0;
const fs = require("fs");
class ResponseAction {
    constructor(res) {
        this._res = res;
    }
    /** 建立 Response Action */
    static create(res) {
        return new ResponseAction(res);
    }
    /** Response JSON 物件 */
    json(data) {
        this._res.status(HttpStatusCode.OK_200).json(data);
        return this;
    }
    /** Response File Stream */
    fileStream(filePath, fileName, contentType) {
        var fileSteam = fs.createReadStream(filePath);
        this._res.set('Content-Disposition', `attachment; filename=${fileName}`);
        this._res.set('Content-Type', contentType);
        fileSteam.pipe(this._res);
    }
    /** Response File */
    file(filePath, fileName, contentType) {
        this._res.set('Content-Disposition', `attachment; filename=${fileName}`);
        this._res.set('Content-Type', contentType);
        this._res.status(HttpStatusCode.OK_200).sendFile(filePath);
    }
    /** End Response */
    end() {
        this._res.end();
    }
}
exports.ResponseAction = ResponseAction;
class RequestParser {
    constructor(res) {
        this._req = res;
    }
    /** 建立 Request Parser */
    static create(req) {
        return new RequestParser(req);
    }
    getBody() {
        if (this._req) {
            return this._req.body;
        }
        return null;
    }
}
exports.RequestParser = RequestParser;
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
//# sourceMappingURL=expressUtils.js.map