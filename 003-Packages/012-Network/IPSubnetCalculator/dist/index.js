"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ip = require("ip");
const netmask_1 = require("netmask");
const Ip6Addr = require("ip6addr");
const RangeCheck = require("range_check");
const IpAddr = require("ipaddr.js");
const ipList = {
    ip: '192.168.1.168',
    mask: '255.255.255.0',
    cidr: '192.168.1.168/24',
    ipRange: '192.168.1.168/255.255.255.0'
};
console.log('===== Demo IP =====');
demoIp('192.168.1.100');
demoIp('172.16.1.100');
demoIp('::1');
demoIp('::ffff:192.168.1.100');
demoIp('::ffff:c0a8:164');
console.log('===== Demo Netmask =====');
demoNetmask('192.168.1.100');
demoNetmask('172.16.1.100');
demoNetmask('::1');
demoNetmask('::ffff:192.168.1.100');
demoNetmask('::ffff:c0a8:164');
console.log('===== Demo Ip6Addr =====');
demoIp6addr('192.168.1.100');
demoIp6addr('172.16.1.100');
demoIp6addr('::ffff:127.0.0.1');
//demoIp6addr('::1');
demoIp6addr('::ffff:192.168.1.100');
demoIp6addr('::ffff:172.16.1.100');
demoIp6addr('::ffff:c0a8:164');
demoIp6addr('::ffff:ac10:164');
demoIp6addr('2001:0db8::0001');
demoIp6addr('192.168.1.168/24');
console.log('===== Demo Range Check =====');
demoRangCheck('192.168.1.100');
demoRangCheck('172.16.1.100');
demoRangCheck('::1');
demoRangCheck('::ffff:192.168.1.100');
demoRangCheck('::ffff:172.16.1.100');
demoRangCheck('::ffff:c0a8:164');
demoRangCheck('::ffff:ac10:164');
demoRangCheck('2001:0db8::0001');
demoRangCheck('192.168.1.168/24');
demoRangCheck('192.168.1.168/255.255.255.0');
console.log('===== Demo IP Addr =====');
demoIpAddr('192.168.1.100');
demoIpAddr('172.16.1.100');
demoIpAddr('::1');
demoIpAddr('::ffff:192.168.1.100');
demoIpAddr('::ffff:172.16.1.100');
demoIpAddr('::ffff:c0a8:164');
demoIpAddr('::ffff:ac10:164');
demoIpAddr('2001:0db8::0001');
console.log('===== Demo Mix IP Addr and IP 6 Addr =====');
demoMixIpAddr('192.168.1.100');
demoMixIpAddr('172.16.1.100');
demoMixIpAddr('::1');
demoMixIpAddr('::ffff:192.168.1.100');
demoMixIpAddr('::ffff:172.16.1.100');
demoMixIpAddr('::ffff:c0a8:164');
demoMixIpAddr('::ffff:ac10:164');
function demoIp(ip) {
    if (Ip.isV4Format(ip)) {
        console.log(`${ip}: ${filterIp(ip)}`);
        console.log(`${ip}: ${filterIpCidr(ip)} (CIDR)`);
    }
    else if (ip === '::1') {
        const localhost = '127.0.0.1';
        console.log(`${ip} (${localhost}): ${filterIp(localhost)}`);
        console.log(`${ip} (${localhost}): ${filterIpCidr(localhost)} (CIDR)`);
    }
    else {
        console.warn(`Not support ipv6: ${ip}`);
    }
    function filterIp(ip) {
        let subnet = Ip.subnet(ipList.ip, ipList.mask);
        return subnet.contains(ip);
    }
    function filterIpCidr(ip) {
        let subnet = Ip.cidrSubnet(ipList.cidr);
        return subnet.contains(ip);
    }
}
function demoNetmask(ip) {
    if (Ip.isV4Format(ip)) {
        console.log(`${ip}: ${filterIp(ip)}`);
        console.log(`${ip}: ${filterIpRange(ip)}`);
        console.log(`${ip}: ${filterIpCidr(ip)} (CIDR)`);
    }
    else if (ip === '::1') {
        const localhost = '127.0.0.1';
        console.log(`${ip} (${localhost}): ${filterIp(localhost)}`);
        console.log(`${ip} (${localhost}): ${filterIpRange(localhost)}`);
        console.log(`${ip} (${localhost}): ${filterIpCidr(localhost)} (CIDR)`);
    }
    else {
        console.warn(`Not support ipv6: ${ip}`);
    }
    function filterIp(ip) {
        let block = new netmask_1.Netmask(ipList.ip, ipList.mask);
        return block.contains(ip);
    }
    function filterIpRange(ip) {
        let block = new netmask_1.Netmask(ipList.ipRange);
        return block.contains(ip);
    }
    function filterIpCidr(ip) {
        let block = new netmask_1.Netmask(ipList.cidr);
        return block.contains(ip);
    }
}
function demoIp6addr(ip) {
    if (isIpv4(ip)) {
        console.log(`${ip}: ${filterIp(ip)}`);
        console.log(`${ip}: ${filterIpCidr(ip)} (CIDR)`);
        console.log(`${ip}: ipv4`);
    }
    if (isIpv6(ip)) {
        console.log(`${ip}: ${filterIp(ip)}`);
        console.log(`${ip}: ${filterIpCidr(ip)} (CIDR)`);
        console.log(`${ip}: ipv6`);
    }
    if (isCidr(ip)) {
        console.log(`${ip}: subnet`);
    }
    //let ipAddr = Ip6Addr.parse(ip);
    //console.log(`${ip}: ${ipAddr.kind()}`);
    /*if (ipAddr.kind() !== 'ipv6') {
        console.log(`${ip}: ${ipAddr.toString({ format: 'v4' })}`);
        
    }*/
    //console.log(`${ip}: ${ipAddr.toString({ format: 'v4-mapped' })}`);
    //console.log(`${ip}: ${ipAddr.toString({ format: 'v6' })}`);
    function filterIp(ip) {
        let cidrLength = maskToCidr(ipList.mask);
        let subnet = Ip6Addr.createCIDR(ipList.ip, cidrLength);
        return subnet.contains(ip);
    }
    function filterIpCidr(ip) {
        let subnet = Ip6Addr.createCIDR(ipList.cidr);
        return subnet.contains(ip);
    }
    function maskToCidr(mask) {
        let maskNodes = mask.match(/(\d+)/g);
        let cidr = 0;
        for (var i in maskNodes) {
            cidr += (((maskNodes[i] >>> 0).toString(2)).match(/1/g) || []).length;
        }
        return cidr;
    }
    function isIpv4(ip) {
        try {
            let ipAddress = Ip6Addr.parse(ip);
            return ipAddress.kind() === 'ipv4';
        }
        catch (_a) {
            return false;
        }
    }
    function isIpv6(ip) {
        try {
            let ipAddress = Ip6Addr.parse(ip);
            return ipAddress.kind() === 'ipv6';
        }
        catch (_a) {
            return false;
        }
    }
    function isCidr(ip) {
        try {
            let cidr = Ip6Addr.createCIDR(ip);
            let cidrText = cidr.toString();
            return true;
        }
        catch (_a) {
            return false;
        }
    }
}
function demoRangCheck(ip) {
    console.log(`${ip}: ${filterIp(ip)}`);
    console.log(`${ip}: ${filterIpCidr(ip)} (CIDR)`);
    if (RangeCheck.isV4(ip)) {
        console.log(`${ip}: ipv4`);
    }
    if (RangeCheck.isV6(ip)) {
        console.log(`${ip}: ipv6`);
    }
    if (RangeCheck.isRange(ip)) {
        console.log(`${ip}: range`);
    }
    function filterIp(ip) {
        let isInRange = RangeCheck.isRange(`${ipList.ip}/${maskToCidr(ipList.mask)}`);
        return isInRange;
    }
    function filterIpCidr(ip) {
        let isInRange = RangeCheck.isRange(ipList.cidr);
        return isInRange;
    }
    function maskToCidr(mask) {
        let maskNodes = mask.match(/(\d+)/g);
        let cidr = 0;
        for (var i in maskNodes) {
            cidr += (((maskNodes[i] >>> 0).toString(2)).match(/1/g) || []).length;
        }
        return cidr;
    }
}
function demoIpAddr(ip) {
    console.log(`${ip}: ${filterIp(ip)}`);
    console.log(`${ip}: ${filterIpCidr(ip)} (CIDR)`);
    console.log(`${ip}: ${IpAddr.parse(ip).kind()}`);
    function filterIp(ip) {
        try {
            let ipAddress = IpAddr.parse(ip);
            let mask = IpAddr.parse(ipList.mask).prefixLengthFromSubnetMask();
            let cidr = IpAddr.parseCIDR(`${ipList.ip}/${mask}`);
            let isMatch = ipAddress.match(cidr);
            return isMatch;
        }
        catch (_a) {
            return false;
        }
    }
    function filterIpCidr(ip) {
        try {
            let ipAddress = IpAddr.parse(ip);
            let isMatch = ipAddress.match(IpAddr.parseCIDR(ipList.cidr));
            return isMatch;
        }
        catch (_a) {
            return false;
        }
    }
}
function demoMixIpAddr(ip) {
    console.log(`${ip}: ${filterIp(ip)}`);
    console.log(`${ip}: ${filterIpCidr(ip)} (CIDR)`);
    console.log(`${ip}: ${IpAddr.parse(ip).kind()}`);
    function filterIp(ip) {
        let maskIp = IpAddr.parse(ipList.mask);
        let maskKind = maskIp.kind();
        let cidrLength = maskIp.prefixLengthFromSubnetMask();
        let subnet = Ip6Addr.createCIDR(ipList.ip, cidrLength);
        return subnet.contains(ip);
    }
    function filterIpCidr(ip) {
        let cidr = IpAddr.parseCIDR(ipList.cidr);
        let cidrKind = cidr[0].kind();
        let subnet = Ip6Addr.createCIDR(ipList.cidr);
        return subnet.contains(ip);
    }
}
//# sourceMappingURL=index.js.map