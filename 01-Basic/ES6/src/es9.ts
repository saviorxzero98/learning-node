
/**
 * 1. Asynchronous Iterators
 **/


/**
 * 2. Promise.finally
 **/

/**
 * 3. Rest / Spread
 **/
let demoRestSpread = function() {
    console.debug('\n5. Spread Operator');

    const printVariable = (variableName: string, variable: any) => {
        console.log(`${variableName} = ${variable}`);
    }

    // 物件分割
    let {o, p, ...q} = { o: 'O', p: 'P', a: 'A', b: 'B', c: 'C' };
    printVariable('o', o);
    printVariable('p', p);
    printVariable('q', JSON.stringify(q));

    // 物件合併
    let opq = {o, p, ...q};
    printVariable('opq', JSON.stringify(opq));

    // 函式參數合併  
    let others = [ 'a', 'b', 'c' ];
    let fun = function (hello: string, world: string, ...others: string[]) {
        printVariable('fun.hello', hello);
        printVariable('fun.world', world);
        printVariable('fun.others', JSON.stringify(others));
    }
    fun('hello', 'world', 'abc', 'opq', 'rst', 'xyz');
    fun('hello', 'world', 'abc', ...others);
}

/**
 * 4. Regular Expression Group Name
 **/
let demoRegexGroupName = () => {
    const datePattern = /(?<year>[0-9]{4})-(?<month>[0-1]{1}[0-9]{1})-(?<day>[0-3]{1}[0-9]{1})/;
    let date = '2020-01-30'
    let match  = datePattern.exec(date);
    let year   = match.groups.year;
    let month  = match.groups.month;
    let day    = match.groups.day;

    console.log(`year: ${year}; month: ${month}; day: ${day}`);

    let usDate = date.replace(datePattern, '$<month>-$<day>-$<year>');
    console.log(`US Date: ${usDate}`);
}

/**
 * 5. Regular Expression Lookahead
 **/

/**
 * 6. Regular Expression Dot All
 **/

/**
 * 7. Regular Expression Unicode 
 **/

/**
 * 8. 非轉義序列的模板字串
 **/


// Demo
export const demoES9 = () => {
    // 3. Rest / Spread
    demoRestSpread();

    // 4. Regular Expression Group Name
    demoRegexGroupName();
}