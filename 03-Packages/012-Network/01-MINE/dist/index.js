"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mime = require("mime");
let urls = [
    'https://www.gsscloud.com/templates/vital2016/images/demo-crm-pic.gif',
    'https://bot-framework.azureedge.net/bot-icons-v1/bot-framework-default-7.png',
    'https://bot-framework.azureedge.net/bot-icons-v1/bot-framework-default-7.jpg',
    'https://bot-framework.azureedge.net/bot-icons-v1/bot-framework-default-7.jpeg',
    'https://adaptivecardsblob.blob.core.windows.net/assets/AdaptiveCardsOverviewVideo.mp3',
    'https://adaptivecardsblob.blob.core.windows.net/assets/AdaptiveCardsOverviewVideo.mp4',
    'https://localhost:3000/v3/attachments/aaaaa/views/original',
    'aaaa'
];
for (let url of urls) {
    console.log(url);
    console.log(`[MIME Type] ${mime.getType(url)}`);
    console.log(`[Extension] ${mime.getExtension(mime.getType(url))}`);
    console.log('\n');
}
console.log(mime.getExtension('application/octet-stream'));
//# sourceMappingURL=index.js.map