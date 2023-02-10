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
const puppeteer = require("puppeteer");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer.launch({
        headless: true,
        args: [
            '--proxy-server="direct://"',
            '--proxy-bypass-list=*'
        ],
        executablePath: 'D:\\Programs\\Vivaldi\\Application\\vivaldi.exe'
    });
    console.log(`Browser Version: ${yield browser.version()}`);
    const page = yield browser.newPage();
    yield page.setRequestInterception(true);
    page.on('request', (interceptedRequest) => __awaiter(void 0, void 0, void 0, function* () {
        if (interceptedRequest.isInterceptResolutionHandled()) {
            return;
        }
        let method = interceptedRequest.method();
        let url = interceptedRequest.url();
        console.info(`> ${method} ${url}`);
        interceptedRequest.continue();
    }));
    page.on('response', (response) => __awaiter(void 0, void 0, void 0, function* () {
        const request = response.request();
        let method = request.method();
        let url = request.url();
		console.info(`> ${method} ${url}`);
    }));
    yield page.goto('https://www.startpage.com/');
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        yield page.screenshot({
            path: 'screenshot/screenshot.png'
        });
        yield browser.close();
    }), 5000);
}))();
//# sourceMappingURL=index.js.map