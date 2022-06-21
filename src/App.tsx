import { useState } from 'react'

import * as R from 'ramda'

import './App.css'

import ChessBoard from './components/ChessBoard/ChessBoard'
import ControlPanel from './components/ControlPanel/ControlPanel'

import { Cell } from "./store/interfaces"

function App() {
  const [moves, setMoves] = useState<Cell[]>([])
  const [currentMovesCounter, setCurrentMovesCounter] = useState<number>(0)

  const onCellClick: (cell: Cell) => void =
    (cell) => {
      setCurrentMovesCounter(R.inc(currentMovesCounter))

      if (R.not(R.equals(cell, nextCell()))) {
        setMoves(R.append(cell, R.take(currentMovesCounter, moves)))
      }
    }

  const nextCell: () => Cell | undefined = () => R.last(R.take(R.inc(currentMovesCounter), moves))

  const newGame: () => void =
    () => {
      setMoves([])
      setCurrentMovesCounter(0)
    }

  const isLastMoveComplete: () => boolean = () => R.equals(R.modulo(R.length(moves), 2), 0)

  const moveBack: () => void =
    () => {
      if (!isLastMoveComplete()) return

      setCurrentMovesCounter(
        R.when(
          R.gt(R.__, 0),
          R.subtract(R.__, 2)
        )(currentMovesCounter)
      )
    }

  const moveForward: () => void =
    () => {
      if (!isLastMoveComplete()) return

      setCurrentMovesCounter(
        R.when(
          R.gt(R.length(moves)),
          R.add(2)
        )(currentMovesCounter)
      )
    }

  const updateCurrentMovesCounter: (index: number) => void = (index) => setCurrentMovesCounter(R.multiply(index, 2))

  return (
    <div className="App">
      <ChessBoard moves={moves} currentMovesCounter={currentMovesCounter} onCellClick={onCellClick} />
      <ControlPanel moves={moves} currentMovesCounter={currentMovesCounter} onNewGame={newGame} onMoveBack={moveBack} onMoveForward={moveForward} onMoveClick={updateCurrentMovesCounter} />
    </div>
  );
}

export default App;
