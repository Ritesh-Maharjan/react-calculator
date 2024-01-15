import './App.css'
import { calculatorButtons } from './globals/calculator-bonus-03-button-data'
import Button from './components/Button'
import { useState } from 'react';

function App() {

  const [screen, setScreen] = useState("0");
  const [memoryVal, setMemoryVal] = useState("0");
  const [firstOperator, setFirstOperator] = useState("");
  const [firstVal, setFirstVal] = useState("0");
  const [resetScreen, setResetScreen] = useState(false);
  const [lastButton, setLastButton] = useState("");

  // uses advanced operations like square root and percentage right away otherwise stores the operator if it's the first one
  const operations = (operator) => {
    if (operator === "Square Root") {
      setScreen(String(Math.sqrt(screen)));
      setResetScreen(true)
      return
    }
    if (operator === "Percent") {
      setScreen(String(screen / 100));
      setResetScreen(true)
      return
    }
   
    if (!firstOperator) {
      setFirstOperator(operator);
      setFirstVal(screen);
      setResetScreen(true);
    } else if (lastButton === "operator") { // if user typed operator last time and typed operator again, we need to replace it
      setFirstOperator(operator);
      return
    }
    else {
      // calculate the previous operation and storing the new one
      calculate(operator)
    }

  }

  // do the previous stored operation calculation
  const calculate = (newOperation = "") => {

    switch (firstOperator) {
      case "Subtract":
        // update the first value to be the updated one
        setFirstVal(String(firstVal - screen))
        // show the updated value on the screen
        setScreen(String(firstVal - screen));
        // change the operator
        setFirstOperator(newOperation);
        if (newOperation === "") {
          setFirstVal("0")
        }
        // reseting the screen so that after doing the calculations, we don't want it to be concatenated with the previous value
        setResetScreen(true)
        break;

      case "Add":
        // update the first value to be the updated one
        setFirstVal(String(Number(firstVal) + Number(screen)))
        // show the updated value on the screen
        setScreen(String(Number(firstVal) + Number(screen)));
        // change the operator
        setFirstOperator(newOperation);
        if (newOperation === "") {
          setFirstVal("0")
        }
        // reseting the screen so that after doing the calculations, we don't want it to be concatenated with the previous value
        setResetScreen(true)

        break;

      case "Multiply":
        // update the first value to be the updated one
        setFirstVal(String(Number(firstVal) * Number(screen)))
        // show the updated value on the screen
        setScreen(String(Number(firstVal) * Number(screen)));
        // change the operator
        setFirstOperator(newOperation);
        if (newOperation === "") {
          setFirstVal("0")
        }
        // reseting the screen so that after doing the calculations, we don't want it to be concatenated with the previous value
        setResetScreen(true)
        break;

      case "Divide":
        // update the first value to be the updated one
        setFirstVal(String(Number(firstVal) / Number(screen)))
        // show the updated value on the screen
        setScreen(String(Number(firstVal) / Number(screen)));
        // change the newOperation
        setFirstnewOperation(newOperation);
        if (newOperation === "") {
          setFirstVal("0")
        }
        // reseting the screen so that after doing the calculations, we don't want it to be concatenated with the previous value
        setResetScreen(true)
        break;

    }
  }

  // do the clear operation
  const clear = (clearType) => {
    // clears all the memories and the calculations
    if (clearType === "All Clear") {
      setScreen("0")
      setFirstOperator("")
      setMemoryVal("0")
      setFirstVal("0")
    }
    // only clears the current screen 
    else {
      setScreen("0")
    }
  }

  // permorming the memory operations
  const memory = (memoryType) => {
    switch (memoryType) {
      case "Memory Save":
        setMemoryVal(screen)
        setScreen("0")
        break;

      case "Memory Clear":
        setMemoryVal("0")
        setScreen("0")
        break;

      case "Memory Recall":
        setScreen(memoryVal)
        break;

      case "Memory Subtract":
        setMemoryVal(String(Number(memoryVal) - Number(screen)));
        setScreen(() => String(Number(memoryVal) - Number(screen)));
        break;

      case "Memory Addition":
        setMemoryVal(String(Number(memoryVal) + Number(screen)));
        setScreen(() => String(Number(memoryVal) + Number(screen)));
        break;

    }
  }

  // display the number on the screen
  const displayNumber = (val) => {
    // checks the reset screen whether to start from scratch or append to the previous values
    if (resetScreen || screen === "0") {
      setScreen(String(val.text))
      setResetScreen(false)
    } else {
      setScreen(screen + val.text)
    }
  }

  // handles the click event on all the buttons
  function handleClick(val) {
    setLastButton(val.type)
    switch (val.type) {
      case "clear":
        clear(val.value)
        break;

      case "memory":
        memory(val.value)
        break;

      case "number":
        displayNumber(val);
        break;

      case "decimal":
        if (!screen.includes(".")) {
          setScreen(screen + ".")
        }
        break;

      case "sign":
        setScreen(String(Number(screen) * (-1)))
        break;

      case "operator":
        operations(val.value)

        break;

      case "enter":
        calculate()
        break;
    }
  }
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h1>Calculator</h1>
        <div className='calculator' >
          <div>
            <h1 className='screen'>{screen}</h1>
          </div>
          <div className='buttons'>
            {calculatorButtons.map((button, index) => {
              return <Button key={index} button={button} handleClick={handleClick} />
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
