'use client'
import { useState } from 'react';

function Key({ value, onClick }) {
  return (
    <button
      className="calcKey"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

function OutputView({ value }) {
  return (
    <input type="text" className="calOutput" value={value} />
  )
}


export default function Calculator() {
  const [outValue, setOutValue] = useState(0);
  const [isFloat, setIsFloat] = useState(false);
  const [isNewValue, setIsNewValue] = useState(true);
  const [lastOp, setLastOp] = useState('');
  const [tempValue, setTempValue] = useState(0);

  function clickNumber(value) {
    if (!isNaN(value)) {
      if (isNewValue) {
        setOutValue(value);
        setIsNewValue(false);
        return;
      }

      var floatValue = String(outValue);
      if (isFloat) {
        if (floatValue.includes('.')) {
          setOutValue(Number(`${floatValue}${value}`));
        }
        else {
          setOutValue(Number(`${floatValue}.${value}`));
        }
      }
      else {
        if (floatValue.includes('.')) {
          setOutValue(Number(`${floatValue}${value}`));
        }
        else {
          setOutValue(outValue * 10 + value);
        }
      }
    }
  }
  function clickClear(isClearAll = false) {
    setOutValue(0);
    setIsFloat(false);
    setIsNewValue(true);
    
    if (isClearAll) {
      setLastOp('');
      setTempValue(0);
    }
  }
  function clickPercent() {
    setOutValue(outValue / 100);
  }
  function clickNegative() {
    setOutValue(outValue * -1);
  }
  function clickSqrt() {
    setOutValue(Math.sqrt(outValue));
  }
  function clickPower() {
    setOutValue(Math.pow(outValue, 2));
  }
  function clickReciprocal() {
    setOutValue(1/outValue);
  }
  function clickBackspace() {
    let value = String(outValue).slice(0, -1);

    if (!isNaN(value)) {
      setOutValue(Number(value));
    }
    else {
      setOutValue(0);
    }    
  }
  function clickFloat() {
    setIsFloat(true);
  }
  function clickOperator(op) {
    switch (op) {
      case "+":
      case "-":
      case "×":
      case "÷":
        if (lastOp) {
          let currentValue = calc(tempValue, outValue, lastOp);
          setOutValue(currentValue);
          setLastOp(op);
          setTempValue(currentValue);
          setIsNewValue(true);
        }
        else {
          setTempValue(outValue);
          setLastOp(op);
          setIsNewValue(true);
        }
        break;

      case "=":
        if (lastOp) {
          setOutValue(calc(tempValue, outValue, lastOp));
          setLastOp('');
          setTempValue(0);
          setIsNewValue(true);
        }
        break;
    }
  }
  function calc(num1: number, num2: number, op: string) {
    switch (op) {
      case "+":
        return (num1 + num2);
      case "-":
        return (num1 - num2);
      case "×":
        return (num1 * num2);
      case "÷":
        return (num1 / num2);
    }
    return num1;
  }

  return (
    <>
      <OutputView value={outValue} />
      <div className="calcKey-row">
        <Key value={"%"} onClick={() => clickPercent()} />
        <Key value={"CE"} onClick={() => clickClear(false)} />
        <Key value={"C"} onClick={() => clickClear(true)} />
        <Key value={"←"} onClick={() => clickBackspace()} />
      </div>
      <div className="calcKey-row">
        <Key value={"¹⁄ₓ"} onClick={() => clickReciprocal()} />
        <Key value={"x²"} onClick={() => clickPower()} />
        <Key value={"√"} onClick={() => clickSqrt()} />
        <Key value={"÷"} onClick={() => clickOperator("÷")} />
      </div>
      <div className="calcKey-row">
        <Key value={"7"} onClick={() => clickNumber(7)} />
        <Key value={"8"} onClick={() => clickNumber(8)} />
        <Key value={"9"} onClick={() => clickNumber(9)} />
        <Key value={"×"} onClick={() => clickOperator("×")} />
      </div>
      <div className="calcKey-row">
        <Key value={"4"} onClick={() => clickNumber(4)} />
        <Key value={"5"} onClick={() => clickNumber(5)} />
        <Key value={"6"} onClick={() => clickNumber(6)} />
        <Key value={"-"} onClick={() => clickOperator("-")} />
      </div>
      <div className="calcKey-row">
        <Key value={"1"} onClick={() => clickNumber(1)} />
        <Key value={"2"} onClick={() => clickNumber(2)} />
        <Key value={"3"} onClick={() => clickNumber(3)} />
        <Key value={"+"} onClick={() => clickOperator("+")} />
      </div>
      <div className="calcKey-row">
        <Key value={"⁺⁄₋"} onClick={() => clickNegative()} />
        <Key value={"0"} onClick={() => clickNumber(0)} />
        <Key value={"."} onClick={() => clickFloat()} />
        <Key value={"="} onClick={() => clickOperator("=")} />
      </div>
    </>
  );
}