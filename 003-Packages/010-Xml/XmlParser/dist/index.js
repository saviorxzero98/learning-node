"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastXmlParser = require("fast-xml-parser");
const xmljs = require("xml-js");
let jsonData = {
    robotmessage: {
        cause: '00',
        type: '0',
        content: ''
    }
};
let xmlData = '<robotmessage><cause>00</cause><type>0</type><content>hello\nhello\nhello</content></robotmessage>';
console.log('Demo Fast XML Parser v3');
toXmlByFastXmlParser(jsonData);
toJsonByFastXmlParser(xmlData);
console.log('\n\n');
console.log('Demo Fast XML Parser v3');
toXmlByXmlJs(jsonData);
toJsonByXmlJs(xmlData);
console.log('\n\n');
function toXmlByFastXmlParser(jsonData) {
    try {
        let options = {
            ignoreAttributes: true
        };
        const parser = new fastXmlParser.j2xParser(options);
        let xmlText = parser.parse(jsonData);
        console.log(xmlText);
    }
    catch (e) {
        console.error(e);
    }
}
function toJsonByFastXmlParser(xmlText) {
    try {
        let options = {
            ignoreAttributes: true
        };
        let jsonData = fastXmlParser.parse(xmlText, options);
        console.log(JSON.stringify(jsonData));
    }
    catch (e) {
        console.error(e);
    }
}
function toXmlByXmlJs(jsonData) {
    try {
        var options = {
            compact: true,
            ignoreComment: true,
            spaces: 0
        };
        let xmlText = xmljs.js2xml(jsonData, options);
        console.log(xmlText);
    }
    catch (e) {
        console.error(e);
    }
}
function toJsonByXmlJs(xmlText) {
    try {
        var options = {
            compact: true,
            ignoreComment: true,
            nativeType: true
        };
        let jsonData = xmljs.xml2js(xmlText, options);
        console.log(JSON.stringify(jsonData));
    }
    catch (e) {
        console.error(e);
    }
}
//# sourceMappingURL=index.js.map