import * as Bleacon from 'bleacon';

var uuid = 'e4c8a4fc-f68b-470d-959f-29382af72ce7';
var major = 12; // 0 - 65535
var minor = 2; // 0 - 65535
var measuredPower = -61; // -128 - 127 (measured RSSI at 1 meter)

console.log('Start Advertising');

Bleacon.startAdvertising(uuid, major, minor, measuredPower);

