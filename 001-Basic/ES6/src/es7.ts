
/**
 * 1. Array.includes
 **/
let demoArrayInclude = function() {
    let array = ['a', 'b', 'c', 'd'];

    // ES6
    if (array.indexOf('b') !== -1)
    {
        console.log('ES6: true');
    }

    // ES7
    if (array.includes('b'))
    {
        console.log('ES7: true');
    }
}

/**
 * 2. Math Power
 **/
let demoMathPower = function() {
    let array = ['a', 'b', 'c', 'd'];

    // ES6
    let es6Pow = Math.pow(2, 10);
    console.log(`ES6: ${es6Pow}`);

    // ES7
    let es7Pow = 2**10;
    console.log(`ES7: ${es7Pow}`);
}




// Demo
export const demoES7 = () => {
    // 1. Array.includes
    demoArrayInclude();

    // 2. Math Power
    demoMathPower();
}