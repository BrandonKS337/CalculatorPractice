import React from "react";
import "../stylesheets/scientificCalc.css";

const ScientificCalculator = ({ onScientificOperationClick, onClose }) => {
  //defining operation here
  const operations = ["sin", "cos", "tan", "log", "√", "^", "π", "e"];

  return (
    <div className={StyleSheet.scientificWrapper}>
      <button className="closeButton" onClick={onClose}>
        close
      </button>
      <div className="extraButtons">
        {operations.map((op) => (
          <button key={op} onClick={() => onScientificOperationClick(op)}>
            {op}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScientificCalculator;
