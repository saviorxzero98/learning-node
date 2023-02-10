import * as puppeteer  from 'puppeteer';


(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--proxy-server="direct://"',
            '--proxy-bypass-list=*'
        ]
    });
    console.log(`Browser Version: ${await browser.version()}`);
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', async (interceptedRequest) => {
        if (interceptedRequest.isInterceptResolutionHandled()) {
            return;
        }
        let method = interceptedRequest.method();
        let url = interceptedRequest.url();
        console.info(`> ${method} ${url}`);

        interceptedRequest.continue();
    });
    page.on('response', async(response) => {
        const request = response.request();

        let method = request.method();
        let url = request.url();
		
		console.info(`> ${method} ${url}`);
    });

    await page.goto('https://www.startpage.com/');
    
    setTimeout(async () => {
        await page.screenshot({
            path: 'screenshot/screenshot.png'
        })
        await browser.close(); 
    }, 5000);
})();