import * as axios from 'axios';
import * as cheerio from 'cheerio';

const rootUrl = 'https://tw.appledaily.com';
const url = `${rootUrl}/home`;


axios.default
    .get(url)
    .then(async function (response) {
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