import * as semver  from 'semver';
import * as compareVersions from 'compare-versions';


console.log('========= semver ========');
console.log(`'1.2.3' ==> ${semver.valid('1.2.3')}`);
console.log(`'a.b.c' ==> ${semver.valid('a.b.c')}`);
console.log(`empty ==> ${semver.valid('')}`);

console.log(`1.6.0+`);
console.log(`1.4.0 ==> ${semver.gt('1.4.0', '1.6.0')}`);
console.log(`1.5.0 ==> ${semver.gt('1.5.0', '1.6.0')}`);
console.log(`1.6.0 ==> ${semver.gt('1.6.0', '1.6.0')}`);
console.log(`1.7.0 ==> ${semver.gt('1.7.0', '1.6.0')}`);



console.log('\n\n========= Compare Versions ========');

console.log(`'1.2' ==> ${compareVersions.validate('1.2')}`);
console.log(`'1.2.3' ==> ${compareVersions.validate('1.2.3')}`);
console.log(`'a.b.c' ==> ${compareVersions.validate('a.b.c')}`);
console.log(`empty ==> ${compareVersions.validate('')}`);

console.log(`1.7.0+`);
console.log(`1.4.0 ==> ${compareVersions.compare('1.4.0', '1.7.0', '>=')}`);
console.log(`1.5.0 ==> ${compareVersions.compare('1.5.0', '1.7.0', '>=')}`);
console.log(`1.6.0 ==> ${compareVersions.compare('1.6.0', '1.7.0', '>=')}`);
console.log(`1.7.0 ==> ${compareVersions.compare('1.7.0', '1.7.0', '>=')}`);
console.log(`1.7.1 ==> ${compareVersions.compare('1.7.1', '1.7', '>=')}`);

