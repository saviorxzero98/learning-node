/**
 * 1. async/await
 **/





/**
 * 2. Object.values
 **/
let demoObjectValues = function() {
    let obj = {a: 1, b: 2, c: 3};

    // ES7
    let es6ObjKeys = Object.keys(obj);
    let es6ObjValues = [];
    for (let key of es6ObjKeys) {
        es6ObjValues.push(obj[key]);
    }
    console.log(`ES7: ${JSON.stringify(es6ObjValues)}`);

    // ES8
    let es7ObjValues = Object.values(obj);
    console.log(`ES8: ${JSON.stringify(es7ObjValues)}`);
}

/**
 * 3. Object.entries
 **/
let demoObjectEntries = function() {
    let obj = {a: 1, b: 2, c: 3};

    // ES7
    console.log(`ES7:`);
    let es6ObjKeys = Object.keys(obj);
    for (let key of es6ObjKeys) {
        console.log(`    Key: ${key}; value: ${obj[key]}`);        
    }

    // ES8
    console.log(`ES8:`);
    let es7ObjEntries = Object.entries(obj);
    for (let [key,value] of es7ObjEntries) {
        console.log(`    Key: ${key}; value: ${value}`);        
    }
}

/**
 * 4. String Padding
 **/
let demoStringPadding = function() {
    let numberText = '3.14';

    // Padding Start
    console.log(`Padding Start: '${numberText.padStart(10, '0')}'`);

    // Padding End
    console.log(`Padding End: '${numberText.padEnd(10, '0')}'`);
}


/**
 * 5. 函式引數列表結尾允許逗號
 **/


/**
 * 6. Object.getOwnPropertyDescriptors
 **/
let demoGetOwnPropertyDescriptors = function() {
    let obj =  {
        name: 'Jine',
        get age() { return '18' }
    };

    let result = Object.getOwnPropertyDescriptors(obj);
    console.log(result);
}

/**
 * 7. SharedArrayBuffer Object
 **/


/**
 * 8. Atomics Object
 **/


// Demo
export const demoES8 = () => {
    
    // 2. Object.values
    demoObjectValues();

    // 3. Object.entries
    demoObjectEntries();

    // 4. String Padding
    demoStringPadding();

    // 6. Object.getOwnPropertyDescriptors
    demoGetOwnPropertyDescriptors();
}