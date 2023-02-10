import * as Ip from 'ip';
import { Netmask } from 'netmask';
import * as Ip6Addr from 'ip6addr';
import * as RangeCheck from 'range_check';
import * as IpAddr from 'ipaddr.js';

const ipList = {
    ip: '192.168.1.168',
    mask: '255.255.255.0',
    cidr: '192.168.1.168/24',
    ipRange: '192.168.1.168/255.255.255.0'
}

console.log('===== Demo IP =====')
demoIp('192.168.1.100');
demoIp('172.16.1.100');
demoIp('::1');
demoIp('::ffff:192.168.1.100');
demoIp('::ffff:c0a8:164');

console.log('===== Demo Netmask =====')
demoNetmask('192.168.1.100');
demoNetmask('172.16.1.100');
demoNetmask('::1');
demoNetmask('::ffff:192.168.1.100');
demoNetmask('::ffff:c0a8:164');

console.log('===== Demo Ip6Addr =====')
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

console.log('===== Demo Range Check =====')
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

console.log('===== Demo IP Addr =====')
demoIpAddr('192.168.1.100');
demoIpAddr('172.16.1.100');
demoIpAddr('::1');
demoIpAddr('::ffff:192.168.1.100');
demoIpAddr('::ffff:172.16.1.100');
demoIpAddr('::ffff:c0a8:164');
demoIpAddr('::ffff:ac10:164');
demoIpAddr('2001:0db8::0001');

console.log('===== Demo Mix IP Addr and IP 6 Addr =====')
demoMixIpAddr('192.168.1.100');
demoMixIpAddr('172.16.1.100');
demoMixIpAddr('::1');
demoMixIpAddr('::ffff:192.168.1.100');
demoMixIpAddr('::ffff:172.16.1.100');
demoMixIpAddr('::ffff:c0a8:164');
demoMixIpAddr('::ffff:ac10:164');


function demoIp(ip: string) {
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

    function filterIp(ip: string) : boolean {
        let subnet = Ip.subnet(ipList.ip, ipList.mask);
        return subnet.contains(ip);
    }
    function filterIpCidr(ip: string) : boolean {
        let subnet = Ip.cidrSubnet(ipList.cidr);
        return subnet.contains(ip);
    }
}

function demoNetmask(ip: string) {
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

    function filterIp(ip: string) : boolean {
        let block = new Netmask(ipList.ip, ipList.mask);
        return block.contains(ip);
    }
    function filterIpRange(ip: string) : boolean {
        let block = new Netmask(ipList.ipRange);
        return block.contains(ip);
    }
    function filterIpCidr(ip: string) : boolean {
        let block =  new Netmask(ipList.cidr);
        return block.contains(ip);
    }
}

function demoIp6addr(ip: string) {
    if (isIpv4(ip))  {
        console.log(`${ip}: ${filterIp(ip)}`);
        console.log(`${ip}: ${filterIpCidr(ip)} (CIDR)`);
        console.log(`${ip}: ipv4`);    
    }
    if (isIpv6(ip))  {
        console.log(`${ip}: ${filterIp(ip)}`);
        console.log(`${ip}: ${filterIpCidr(ip)} (CIDR)`);
        console.log(`${ip}: ipv6`);
    }
    if (isCidr(ip))  {
        console.log(`${ip}: subnet`);
    }

    //let ipAddr = Ip6Addr.parse(ip);
    //console.log(`${ip}: ${ipAddr.kind()}`);
    /*if (ipAddr.kind() !== 'ipv6') {
        console.log(`${ip}: ${ipAddr.toString({ format: 'v4' })}`);
        
    }*/
    //console.log(`${ip}: ${ipAddr.toString({ format: 'v4-mapped' })}`);
    //console.log(`${ip}: ${ipAddr.toString({ format: 'v6' })}`);

    function filterIp(ip: string) : boolean {
        let cidrLength = maskToCidr(ipList.mask);
        let subnet = Ip6Addr.createCIDR(ipList.ip, cidrLength);
        return subnet.contains(ip);
    }
    function filterIpCidr(ip: string) : boolean {
        let subnet = Ip6Addr.createCIDR(ipList.cidr);
        return subnet.contains(ip);
    }
    function maskToCidr(mask: string): number {
        let maskNodes: any = mask.match(/(\d+)/g);
        let cidr = 0;
        for(var i in maskNodes)
        {
            cidr += (((maskNodes[i] >>> 0).toString(2)).match(/1/g) || []).length;
        }
        return cidr;
    }
    function isIpv4(ip: string) {
        try {
            let ipAddress = Ip6Addr.parse(ip);
            return ipAddress.kind() === 'ipv4';
        }
        catch {
            return false;
        }
    }
    function isIpv6(ip: string) {
        try {
            let ipAddress = Ip6Addr.parse(ip);
            return ipAddress.kind() === 'ipv6';
        }
        catch {
            return false;
        }
    }
    function isCidr(ip: string) {
        try {
            let cidr = Ip6Addr.createCIDR(ip);
            let cidrText = cidr.toString();
            return true;
        }
        catch {
            return false;
        }
    }
}

function demoRangCheck(ip: string) {
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

    function filterIp(ip: string) : boolean {
        let isInRange = RangeCheck.isRange(`${ipList.ip}/${maskToCidr(ipList.mask)}`);
        return isInRange;
    }
    function filterIpCidr(ip: string) : boolean {
        let isInRange = RangeCheck.isRange(ipList.cidr);
        return isInRange;
    }
    function maskToCidr(mask: string): number {
        let maskNodes: any = mask.match(/(\d+)/g);
        let cidr = 0;
        for(var i in maskNodes)
        {
            cidr += (((maskNodes[i] >>> 0).toString(2)).match(/1/g) || []).length;
        }
        return cidr;
    }
}

function demoIpAddr(ip: string) {
    console.log(`${ip}: ${filterIp(ip)}`);
    console.log(`${ip}: ${filterIpCidr(ip)} (CIDR)`);
    console.log(`${ip}: ${IpAddr.parse(ip).kind()}`);

    function filterIp(ip: string) : boolean {
        try {
            let ipAddress = IpAddr.parse(ip);
            let mask = IpAddr.parse(ipList.mask).prefixLengthFromSubnetMask();
            let cidr = IpAddr.parseCIDR(`${ipList.ip}/${mask}`);
            let isMatch = ipAddress.match(cidr);
            return isMatch;
        }
        catch {
            return false;
        }
    }
    function filterIpCidr(ip: string) : boolean {
        try {
            let ipAddress = IpAddr.parse(ip);
            let isMatch = ipAddress.match(IpAddr.parseCIDR(ipList.cidr));
            return isMatch;
        }
        catch {
            return false;
        }
    }
}

function demoMixIpAddr(ip: string) {
    console.log(`${ip}: ${filterIp(ip)}`);
    console.log(`${ip}: ${filterIpCidr(ip)} (CIDR)`);
    console.log(`${ip}: ${IpAddr.parse(ip).kind()}`);

    function filterIp(ip: string) : boolean {
        let maskIp = IpAddr.parse(ipList.mask);
        let maskKind = maskIp.kind();
        let cidrLength = maskIp.prefixLengthFromSubnetMask();
        let subnet = Ip6Addr.createCIDR(ipList.ip, cidrLength);
        return subnet.contains(ip);
    }
    function filterIpCidr(ip: string) : boolean {
        let cidr = IpAddr.parseCIDR(ipList.cidr);
        let cidrKind = cidr[0].kind();
        let subnet = Ip6Addr.createCIDR(ipList.cidr);
        return subnet.contains(ip);
    }
}