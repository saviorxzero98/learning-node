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
const axios = require("axios");
const cheerio = require("cheerio");
const rootUrl = 'https://tw.appledaily.com';
const url = `${rootUrl}/home`;
axios.default
    .get(url)
    .then(function (response) {
    return __awaiter(this, void 0, void 0, function* () {
        const $ = cheerio.load(response.data);
        const list = $('div.flex-feature')
            .slice(0, 25)
            .map((_, item) => {
            const title = $(item).find('span.headline').text();
            const link = rootUrl + $(item).find('a').attr('href');
            const pubDate = $(item).find('div.timestamp').text();
            return {
                title,
                link,
                pubDate,
            };
        })
            .get();
    });
});
//# sourceMappingURL=index.js.map