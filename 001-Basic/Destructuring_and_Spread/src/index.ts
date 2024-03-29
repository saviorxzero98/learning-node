
let array = ["A", "B", "C", "D"];

console.log(array);
test(...array);

function test (...a: string[]) {
    console.log(a);
}


function returnMoreValue() : [ number, string, boolean ] {
    let x = 5;
    let y = 'hello';
    let z = true;
    return [ x, y, z ];
}
function returnMoreValue2() : { a: number, b: string, c: boolean } {
    let a = 5;
    let b = 'hello';
    let c = true;
    return { c, b, a };
}

let [ x, y, z ] = returnMoreValue();
let { a, b, c} = returnMoreValue2();

console.log(`X = ${x} ; y = ${y} ; z = ${z}`);
console.log(`a = ${a} ; b = ${b} ; c = ${c}`);