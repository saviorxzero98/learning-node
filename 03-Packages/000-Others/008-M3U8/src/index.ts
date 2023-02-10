import { M3uParser } from 'm3u-parser-generator';
import * as m3u8Parser from 'm3u8-parser';
import * as iptvPlaylistParser from 'iptv-playlist-parser'

const m3u8Content = `#EXTM3U
#EXT-X-VERSION:3
#EXT-X-STREAM-INF:BANDWIDTH=2248704,RESOLUTION=1280x720
720/chunklist.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=1359872,RESOLUTION=854x480
480/chunklist.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=786432,RESOLUTION=640x360
360/chunklist.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=237568,RESOLUTION=426x240
240/chunklist.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=81920,RESOLUTION=256x144
144/chunklist.m3u8
`;


function demoM3uParserGenerator() {
    const playlist = M3uParser.parse(m3u8Content);
    console.log(playlist);
}

function demoM3U8Parser() {
    var parser = new m3u8Parser.Parser();

    parser.push(m3u8Content);
    parser.end();
    
    var parsedManifest = parser.manifest;
    
    console.log(parsedManifest);
}

function demoIptvPlaylistParser() {
    const result = iptvPlaylistParser.parse(m3u8Content)

    console.log(result);
}

demoM3uParserGenerator();
demoM3U8Parser();
demoIptvPlaylistParser();