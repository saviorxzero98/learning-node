"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uri = void 0;
const url_1 = require("url");
const path = require("path");
const nodeUtils = require("util");
/** Uri 處理 */
class Uri {
    constructor(baseUrl, ...params) {
        this._protocol = '';
        this._hostname = '';
        this._port = '';
        this._pathname = '';
        this._search = '';
        this._hash = '';
        this.setHref(baseUrl, ...params);
    }
    /** 設定 Href */
    setHref(href, ...params) {
        if (href) {
            try {
                let formatedHref = nodeUtils.format(href, ...params)
                    .replace(/([^:]\/)\/+/g, "$1");
                const url = new url_1.URL(formatedHref);
                this._protocol = url.protocol;
                this._hostname = url.hostname;
                this._port = url.port;
                this._pathname = url.pathname;
                this._search = url.search;
                this._hash = url.hash;
            }
            catch (_a) {
            }
        }
        return this;
    }
    /** 轉成字串 */
    toString() {
        // 處理 Protocol
        let protocol = this.getProtocol();
        // 處理 Host + Port '<Host>:<Port>'
        let host = this.getHost();
        // 處理 Path + Search 
        let path = this.getPath();
        // 處理 Hash
        let hash = this.getHash();
        if (protocol && host) {
            let href = `${protocol}//${host}${path}${hash}`;
            return href;
        }
        return '';
    }
    /** 設定 Protocol (ex: 'http', 'https', 'ws', 'wss' or 'ftp') */
    setProtocol(protocol) {
        if (protocol) {
            protocol = protocol.replace('//', '');
            this._protocol = (protocol.endsWith(':')) ? protocol : `${protocol}:`;
        }
        return this;
    }
    /** 取得 Protocol (ex: 'http:', 'https:', 'ws:', 'wss:' or 'ftp:') */
    getProtocol() {
        return this.formatProtocal(this._protocol);
    }
    /** 取代 Protocol (ex: 'http:', 'https:', 'ws:', 'wss:' or 'ftp:') */
    replaceProtocol(oldProtocol, newProtocol) {
        let protocol = this.getProtocol();
        if (protocol && oldProtocol && newProtocol) {
            oldProtocol = this.formatProtocal(oldProtocol);
            if (protocol === oldProtocol) {
                return this.setProtocol(newProtocol);
            }
        }
        return this;
    }
    /** 格式化 Protpcol */
    formatProtocal(protocol) {
        let formatedProtocal = protocol;
        if (formatedProtocal) {
            formatedProtocal = formatedProtocal.replace('//', '');
            formatedProtocal = (formatedProtocal.endsWith(':')) ? formatedProtocal : `${formatedProtocal}:`;
            formatedProtocal = formatedProtocal.toLowerCase();
        }
        return formatedProtocal;
    }
    /** 設定 Host Name (ex: 'www.example.com' */
    setHostName(hostName) {
        if (hostName) {
            if (hostName.endsWith('/')) {
                this._hostname = hostName.slice(0, -1);
            }
            else {
                this._hostname = hostName;
            }
        }
        return this;
    }
    /** 取得 Host Name (ex: 'www.example.com' */
    getHostName() {
        return this._hostname;
    }
    /** 設定 Host */
    setHost(hostName, port) {
        this.setHostName(hostName);
        this.setPort(port);
        return this;
    }
    /** 取得 Host (ex: 'www.example.com:443' or ''www.example.com:80') */
    getHost() {
        // 處理 Host + Port '<Host>:<Port>'
        let host = this._hostname;
        let port = this._port;
        if (host && port) {
            host = `${host}:${port}`;
        }
        return host;
    }
    /** 設定 Port */
    setPort(port) {
        this._port = String(port);
        return this;
    }
    /** 取得 Port */
    getPort() {
        return this._port;
    }
    /** 設定 PathName (覆寫掉 PathName) */
    setPathName(pathName) {
        if (pathName) {
            this._pathname = this.formatPathName(pathName);
        }
        else {
            this._pathname = '';
        }
        return this;
    }
    /** 串接 PathName */
    joinPathName(...pathNames) {
        if (pathNames && pathNames.length !== 0) {
            let pathName = path.posix.join(this._pathname, ...pathNames);
            return this.setPathName(pathName);
        }
        return this;
    }
    /** 取得 PathName */
    getPathName() {
        return this._pathname;
    }
    /** 格式化 PathName */
    formatPathName(pathName) {
        let formatedPathName = pathName;
        if (formatedPathName) {
            formatedPathName = (formatedPathName.startsWith('/')) ? formatedPathName : `/${formatedPathName}`;
        }
        return formatedPathName;
    }
    /** 設定 Search (ex: '?id=3' or '?id=3&name=apple') */
    setSearch(query) {
        if (query) {
            if (typeof query === 'string') {
                // 使用字串
                this._search = this.formatSearchString(query);
                return this;
            }
            else if (query instanceof Map) {
                // 使用 Map<string, string>
                let keys = Array.from(query.keys());
                let search = '';
                for (let i = 0; i < keys.length; i++) {
                    let key = keys[i];
                    let value = query.get(key);
                    let isFiresIndex = (i === 0);
                    search += this.getQueryAppendString(key, value, isFiresIndex);
                }
                this._search = search;
            }
            else if (typeof query === 'object') {
                // 使用 Object
                let keys = Object.keys(query);
                let search = '';
                for (let i = 0; i < keys.length; i++) {
                    let key = keys[i];
                    let value = query[key];
                    let isFiresIndex = (i === 0);
                    search += this.getQueryAppendString(key, value, isFiresIndex);
                }
                this._search = search;
            }
        }
        else {
            this._search = '';
            return this;
        }
        return this;
    }
    /** 取得 Search */
    getSearch() {
        return this._search;
    }
    /** 格式化 Search 字串 */
    formatSearchString(query) {
        let formatedQuery = query;
        if (formatedQuery) {
            formatedQuery = (formatedQuery.startsWith('?')) ? formatedQuery : `?${query}`;
        }
        return formatedQuery;
    }
    /** 取得 Query 字串 */
    getQueryAppendString(key, value, isFirstIndex) {
        if (isFirstIndex) {
            return `?${key}=${value}`;
        }
        else {
            return `&${key}=${value}`;
        }
    }
    /** 新增 Query Parameter */
    addQuery(key, value = '') {
        // 取得目前的 Query Parameters
        let queryMap = this.getQueryMap();
        // 設定 Query
        if (key) {
            let encodeValue = encodeURIComponent(value);
            queryMap.set(key, encodeValue);
        }
        // 設定 Search
        return this.setSearch(queryMap);
    }
    /** 新增更多的 Query Parameter */
    addMoreQuery(query) {
        if (query) {
            // 取得目前的 Query Parameters
            let queryMap = this.getQueryMap();
            // 設定 Query
            if (query instanceof Map) {
                // 使用 Map<string, string>
                let keys = Array.from(query.keys());
                for (let i = 0; i < keys.length; i++) {
                    let key = keys[i];
                    let value = encodeURIComponent(query.get(key));
                    queryMap.set(key, value);
                }
                // 設定 Search
                return this.setSearch(queryMap);
            }
            else if (typeof query === 'object') {
                // 使用 Object
                let keys = Object.keys(query);
                for (let i = 0; i < keys.length; i++) {
                    let key = keys[i];
                    let value = encodeURIComponent(query[key]);
                    queryMap.set(key, value);
                }
                // 設定 Search
                return this.setSearch(queryMap);
            }
        }
        return this;
    }
    /** 刪除指定 Query */
    removeQuery(key) {
        // 取得目前的 Query
        let queryMap = this.getQueryMap();
        // 刪除指定 Query
        if (queryMap.has(key)) {
            queryMap.delete(key);
        }
        // 設定 Search
        return this.setSearch(queryMap);
    }
    /** 取得 Query (Map<string, string>) */
    getQueryMap() {
        let query = this._search;
        let dictionary = new Map();
        if (query.indexOf('?') != -1) {
            let search = query.split('?');
            if (search.length === 2) {
                let parameters = search[1].split('&');
                for (let parameter of parameters) {
                    let pairKeyValue = parameter.split('=');
                    if (pairKeyValue.length === 2) {
                        let key = pairKeyValue[0];
                        let value = decodeURIComponent(pairKeyValue[1]);
                        if (key) {
                            dictionary.set(key, value);
                        }
                    }
                }
            }
        }
        return dictionary;
    }
    /** 取得 Query (object) */
    getQueryData() {
        let query = {};
        // 取得目前的 Query Parameters
        let queryMap = this.getQueryMap();
        // 將 Map<string, string> 轉換成 object
        let keys = Array.from(queryMap.keys());
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let value = queryMap.get(key);
            query[key] = value;
        }
        return query;
    }
    /** 取得 Path */
    getPath() {
        // 處理 Path Name
        let pathName = this._pathname;
        if (pathName && !pathName.startsWith('/')) {
            pathName = `/${pathName}`;
        }
        // 處理 Search
        let search = this._search;
        if (search && !search.startsWith('?')) {
            search = `?${search}`;
        }
        let path = `${pathName}${search}`;
        return path;
    }
    /** 設定 Hash (ex: '#1') */
    setHash(hash) {
        if (hash) {
            this._hash = this.formatHash(hash);
        }
        else {
            this._hash = '';
        }
        return this;
    }
    /** 取得 Hash (ex: '#1') */
    getHash() {
        return this.formatHash(this._hash);
    }
    /** 格式化 Hash */
    formatHash(hash) {
        let formatedHash = hash;
        if (formatedHash) {
            formatedHash = (formatedHash.startsWith('#')) ? formatedHash : `#${hash}`;
        }
        return formatedHash;
    }
    /** 複製 */
    clone() {
        let uri = new Uri(this.toString());
        return uri;
    }
}
exports.Uri = Uri;
//# sourceMappingURL=uri.js.map