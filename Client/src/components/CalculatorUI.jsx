import React, { useEffect, useState } from "react";
import "../stylesheets/calculatorUI.css";
import ScientificCalculator from "./ScientificCalculator";

function CalculatorUI() {
  const [value, setValue] = useState("");
  const [operation, setOperation] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);
  const [isScientificOpen, setIsScientificOpen] = useState(false); // state for special operations toggle
  const [animationClass, setAnimationClass] = useState(""); // new animation state

  //handler for toggling scientific ops open/close
  const handleToggleSidebar = () => {
    setIsScientificOpen(!isScientificOpen);
  };

  const handleDigitClick = (digit) => {
    setValue(value + digit);
  };

  const handleOperationClick = (op) => {
    setOperation(op);
    setPreviousValue(value);
    setValue("");
  };

  const handleEqualClick = () => {
    if (operation && previousValue !== null) {
      const current = parseFloat(value);
      const previous = parseFloat(previousValue);
      let result = "";

      switch (operation) {
        case "+":
          result = previous + current;
          break;
        case "-":
          result = previous - current;
          break;
        case "*":
          result = previous * current;
          break;
        case "/":
          result = previous / current;
          break;
        default:
          return;
      }

      setValue(String(result));
      setOperation(null);
      setPreviousValue(null);
    }
  };

  const handleClearClick = () => {
    setValue("");
    setOperation(null);
    setPreviousValue(null);
  };

  const handleScientificOperationClick = (operation) => {
    let currentVal = parseFloat(value);

    switch (operation) {
      case "sin":
        setValue(Math.sin(currentVal).toString());
        break;
      case "cos":
        setValue(Math.cos(currentVal(currentVal).toString));
        break;
      case "tan":
        setValue(Math.tan(currentVal).toString());
        break;
      case "log":
        setValue(Math.log(currentVal).toString());
        break;
      case "√":
        setValue(Math.sqrt(currentVal).toString());
        break;
      case "^": //this is expecting you to square the number. Need to expand later to include an input option to increase power variable
        setValue(Math.pow(currentVal, 2).toString());
        break;
      case "π":
        setValue(Math.PI.toString());
        break;
      case "e":
        setValue(Math.E.toString());
        break;
      default:
        break;
    }
  };

  const createDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button key={i} onClick={() => handleDigitClick(i.toString())}>
          {i}
        </button>
      );
    }
    return digits;
  };

  useEffect(() => {
    setAnimationClass(isScientificOpen ? "slideIn" : "slideOut");
  }, [isScientificOpen]);

  return (
    <>
      <div className="calculatorWrapper">
        <div className="display">{value}</div>
        <div className="keys">
          <button onClick={handleClearClick}>C</button>
          {createDigits()}
          <button onClick={() => handleDigitClick("0")}>0</button>
          <button onClick={() => handleOperationClick("+")}>+</button>
          <button onClick={() => handleOperationClick("-")}>-</button>
          <button onClick={() => handleOperationClick("*")}>*</button>
          <button onClick={() => handleOperationClick("/")}>/</button>
          <button onClick={handleEqualClick}>=</button>
        </div>

        <div className={`scientificWrapper ${animationClass}`}>
          {isScientificOpen && (
            <ScientificCalculator
              onScientificOperationClick={handleScientificOperationClick}
              onClose={() => setIsScientificOpen(false)} //passes a function to handle closing
            />
          )}
        </div>
      </div>
      <div className="specialFunctionsTab" onClick={handleToggleSidebar}>
        Special Functions
      </div>
    </>
  );
}

export default CalculatorUI;
