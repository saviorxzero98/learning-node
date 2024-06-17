"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uri_1 = require("./libs/uri");
let uri = new uri_1.Uri(`https://www.fb.com/api/message?fields=message,attachments`);
let url = uri.addQuery('access_token', 'abc').toString();
console.log(url);
