import React from "react";
import BoutonCalcul from "./boutonCalcul";

class Calculatrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
      previousValue: null,
      operator: null,
      waitingForOperand: false,
      showOperator: false,
      showEquals: false,
    };
  }

  componentDidMount() {
    // Ajouter un écouteur d'événements pour le clavier
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    // Retirer l'écouteur d'événements
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    // Gestion des entrées clavier
    const key = event.key;
    if (/[0-9]/.test(key)) {
      this.inputDigit(parseInt(key));
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
      this.performOperation(key);
    } else if (key === "Enter" || key === "=") {
      this.performOperation("=");
    } else if (key === "Backspace") {
      this.clearAll();
    }
  };

  inputDigit(digit) {
    const { display, waitingForOperand, showEquals } = this.state;
    if (waitingForOperand || showEquals) {
      this.setState({
        display: String(digit),
        waitingForOperand: false,
        showOperator: false,
        showEquals: false,
      });
    } else {
      this.setState({
        display: display === "0" ? String(digit) : display + digit,
        showOperator: false,
      });
    }
  }

  inputDecimal() {
    const { display, waitingForOperand, showEquals } = this.state;
    if (waitingForOperand || showEquals) {
      this.setState({
        display: "0.",
        waitingForOperand: false,
        showOperator: false,
        showEquals: false,
      });
    } else if (display.indexOf(".") === -1) {
      this.setState({
        display: display + ".",
        waitingForOperand: false,
        showOperator: false,
      });
    }
  }

  clearAll() {
    this.setState({
      display: "0",
      previousValue: null,
      operator: null,
      waitingForOperand: false,
      showOperator: false,
      showEquals: false,
    });
  }

  performOperation(nextOperator) {
    const { display, previousValue, operator } = this.state;
    const inputValue = parseFloat(display);

    if (previousValue == null) {
      this.setState({
        previousValue: inputValue,
        waitingForOperand: true,
        operator: nextOperator,
        showOperator: true,
        showEquals: false,
      });
    } else if (operator) {
      const currentValue = previousValue || 0;
      const newValue = this.calculate(currentValue, inputValue, operator);

      this.setState({
        display: String(newValue),
        previousValue: newValue,
        waitingForOperand: true,
        operator: nextOperator,
        showOperator: nextOperator !== "=",
        showEquals: nextOperator === "=",
      });
    }
  }

  calculate(a, b, operator) {
    switch (operator) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
      default:
        return b;
    }
  }

  render() {
    const { display, operator, showOperator, showEquals } = this.state;
    let displayValue;

    if (showEquals) {
      displayValue = `=${display}`; // Afficher = avant le nombre
    } else if (showOperator) {
      displayValue = `${display} ${operator}`; // Afficher le nombre suivi de l'opérateur
    } else {
      displayValue = display; // Afficher juste le nombre
    }

    return (
      <div className="bg-gray-900 p-4 rounded-lg shadow-lg w-[380px] mx-auto">
        {/* Écran d'affichage */}
        <div className="bg-gray-800 text-white text-right text-3xl px-2 py-4 mb-7 rounded">
          {displayValue}
        </div>
        {/* Grille de boutons */}
        <div className="grid grid-cols-4 ps-4 gap-1">

          <BoutonCalcul
            label="C"
            onClick={() => this.clearAll()}
            className="bg-red-500 mb-2 col-span-4"
          />
          <BoutonCalcul label="7" onClick={() => this.inputDigit(7)} />
          <BoutonCalcul label="8" onClick={() => this.inputDigit(8)} />
          <BoutonCalcul label="9" onClick={() => this.inputDigit(9)} />
          <BoutonCalcul
            label="÷"
            onClick={() => this.performOperation("/")}
            className="bg-orange-500"
          />

          <BoutonCalcul label="4" onClick={() => this.inputDigit(4)} />
          <BoutonCalcul label="5" onClick={() => this.inputDigit(5)} />
          <BoutonCalcul label="6" onClick={() => this.inputDigit(6)} />
          <BoutonCalcul
            label="×"
            onClick={() => this.performOperation("*")}
            className="bg-orange-500"
          />

          <BoutonCalcul label="1" onClick={() => this.inputDigit(1)} />
          <BoutonCalcul label="2" onClick={() => this.inputDigit(2)} />
          <BoutonCalcul label="3" onClick={() => this.inputDigit(3)} />
          <BoutonCalcul
            label="-"
            onClick={() => this.performOperation("-")}
            className="bg-orange-500"
          />

          <BoutonCalcul label="0" onClick={() => this.inputDigit(0)} />
          <BoutonCalcul label="." onClick={() => this.inputDecimal()} />
          <BoutonCalcul
            label="="
            onClick={() => this.performOperation("=")}
            className="bg-blue-500"
          />
          <BoutonCalcul
            label="+"
            onClick={() => this.performOperation("+")}
            className="bg-orange-500"
          />

        </div>
      </div>
    );
  }
}

export default Calculatrice;
