
import React, { useState } from 'react';
import './App.css';
import Die from './components/Die';
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'



function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [count, setCount] = useState(0)


  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("You won!")
    }
  }, [dice])

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })
    }
    return newDice
  }

  function rollDice() {
    setCount(count + 1)
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return !die.isHeld ? { ...die, value: Math.ceil(Math.random() * 6) } : die
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice)
    }
  }
  console.log(count)

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } : die
    }))
  }

  const diceElements = dice.map(die => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
  ))

  return (
    <main>
      <div className='confetti'>
        {tenzies ? <Confetti /> : ""}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <h1 className='won'>  {!tenzies ? " " : `Congrats! You won in ${count} click.`}</h1>
      <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App;
