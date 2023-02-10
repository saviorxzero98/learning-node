"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jimp = require("jimp");
const imagePath = 'image.png';
let convertImage = (path, type) => __awaiter(void 0, void 0, void 0, function* () {
    let image = yield jimp.read(path);
    let thumbFileBuffer = yield image.resize(10, 10).getBufferAsync(type);
    let base64 = thumbFileBuffer.toString('base64');
    console.log(base64);
});
convertImage(imagePath, jimp.MIME_JPEG);
//# sourceMappingURL=index.js.map