import * as cheerio from 'cheerio';

const html = `<p><spark-mention data-object-type="person" data-object-id="a0123">Bot</spark-mention>  <spark-mention data-object-type="groupMention" data-group-type="all">全部</spark-mention> hello workd</p>`;

const $ = cheerio.load(html);
$('spark-mention').remove();
console.log($('p').text().trim());