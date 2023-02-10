import { Uri } from './libs/uri';

let uri = new Uri('https://yourhost.com/ap/chatbot').replaceProtocol('http', 'ws')
                                                      .replaceProtocol('https', 'wss')
                                                      .joinPathName('production', 'dl')
                                                      .joinPathName('token')
                                                      .addQuery('id', '3');

console.log(uri.toString());


var uri2 = new Uri('http://example.com.tw:8080/GetRelationData?type=A');
uri2 = uri2.addQuery('codeId', '中文字');
uri2 = uri2.addMoreQuery({
    text: '=&?',
    value: '',
    token: 'A123456'
});
uri2 = uri2.setPathName('api')
           .joinPathName('relationData')
           .setProtocol('https')
           .setPort(443);

console.log(uri2.toString());
console.log(uri2.getQueryData());

let uri3 = new Uri('https://yourhost.com/channel').joinPathName('telegram')
                                                .joinPathName('MyBot');
console.log(uri3.toString());

let uri4 = new Uri('%s/v3/attachments/%s/views/original', 'https://yourhost.com/', 'abc13');
console.log(uri4.toString());