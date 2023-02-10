import Mocha = require('mocha');
import Chai = require('chai');
import Calculator = require('../src/index');
import Sinon = require('sinon');

const calculator = new Calculator.Calculator();

process.CONSOLE_EVENTS.emit('warning', () => {
    console.log('received warning');
});


describe('mocha', () => {
    before(() => {
        // 在所有測試開始前會執行的程式碼區塊
        console.log('before');
    });

    after(() => {
        // 在所有測試結束後會執行的程式碼區塊
        console.log('after');
    });

    beforeEach(() => {
        // 在每個 Test Case 開始前執行的程式碼區塊
        console.log('beforeEach');
    });

    afterEach(() => {
        // 在每個 Test Case 結束後執行的程式碼區塊
        console.log('afterEach');
    });

    // 撰寫個別 Test Case
    it('Test 01', () => {
        // 執行 Test Case 01
        let result = calculator.add(1, 1);
        Chai.expect(2).equals(result);
    });

    it('Test 02', () => {
        // 執行 Test Case 02
        let result = calculator.add(1, 1);
        Chai.expect(3).equals(result);
    });
});