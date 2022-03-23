import { useState } from 'react'

import './App.css'

import BoardFlipper from './components/BoardFlipper/BoardFlipper'
import Board from './components/Board/Board'
import ControlPanel from './components/ControlPanel/ControlPanel'

import { INITIAL_CELLS } from "./store/constants"

function App() {
  const [cells, setCells] = useState(INITIAL_CELLS)
  const [rememberedCell, setRememberedCell] = useState<{ID: string, pieceID: string | null} | null>(null)
  const [isBoardFlipped, setIsBoardFlipped] = useState<boolean>(false)
  const [isWhitePlayerCurrent, setIsWhitePlayerCurrent] = useState<boolean>(true)
  const [moves, setMoves] = useState<{fromCell: {ID: string, pieceID: string | null}, toCell: {ID: string, pieceID: string | null}, active: boolean}[]>([])

  const onCellClick = (cellID: string):void => {
    let currentCell = {ID: cellID, pieceID: cells.get(cellID)?.pieceID as string | null}

    if (rememberedCell === null || rememberedCell === undefined) {
      if (currentCell.pieceID === null) {
        return
      }

      setRememberedCell(currentCell)
      return
    }

    let newCells =
      new Map<string, {pieceID: string | null, active: boolean}>(
        Array.from(cells).map(([ID, {pieceID, active}]) => {
          if (ID === cellID) {
            return [ID, {pieceID: rememberedCell.pieceID, active: true}]
          }
          if (ID === rememberedCell.ID) {
            return [ID, {pieceID: null, active: true}]
          }
          return [ID, {pieceID: pieceID, active: false}]
        })
      )
    setCells(new Map(Array.from(newCells)))
    // setIsBoardFlipped(!isBoardFlipped)
    setRememberedCell(null)
    setIsWhitePlayerCurrent(!isWhitePlayerCurrent)

    calculateMoves({fromCell: rememberedCell, toCell: currentCell, active: true})
  }

  const flipBoard = ():void => {
    setCells(
      new Map(Array.from(cells).reverse())
    )
    setIsBoardFlipped(!isBoardFlipped)
  }

  const resetGame = () => {
    setCells(INITIAL_CELLS)
    setRememberedCell(null)
    setIsBoardFlipped(false)
    setIsWhitePlayerCurrent(true)
    setMoves([])
  }

  const moveBack = () => {
    let currentActiveMoveIndex = moves.findIndex(move => move.active === true)

    if (currentActiveMoveIndex === -1) return

    setIsWhitePlayerCurrent(!isWhitePlayerCurrent)

    if (currentActiveMoveIndex === 0) {
      setCells(INITIAL_CELLS)
      setMoves(
        moves.map(move => {
          return {...move, active: false}
        })
      )
      return
    }

    let newMoves =
      moves.map((move, i) => {
        if (i === currentActiveMoveIndex - 1) {
          return {...move, active: true}
        }
        if (i === currentActiveMoveIndex) {
          return {...move, active: false}
        }
        return move
      })
    setMoves(newMoves)

    recalculateBoardState(moves.slice(0, currentActiveMoveIndex))
  }

  const moveForward = () => {
    let currentActiveMoveIndex = moves.findIndex(move => move.active === true)

    if (currentActiveMoveIndex === moves.length - 1) {
      return
    }

    setIsWhitePlayerCurrent(!isWhitePlayerCurrent)

    let newMoves =
      moves.map((move, i) => {
        if (i === currentActiveMoveIndex + 1) {
          return {...move, active: true}
        }
        if (i === currentActiveMoveIndex) {
          return {...move, active: false}
        }
        return move
      })
    setMoves(newMoves)

    recalculateBoardState(moves.slice(0, currentActiveMoveIndex + 2))
  }

  const recalculateBoardState = (moves: {fromCell: {ID: string, pieceID: string | null}, toCell: {ID: string, pieceID: string | null}, active: boolean}[]) => {
    let newCells = new Map(INITIAL_CELLS)

    moves.map((move, i, {length}) => {
      let isActive = i === length - 1 ? true : false

      newCells.set(move.fromCell.ID, {pieceID: null, active: isActive})
      newCells.set(move.toCell.ID, {pieceID: move.fromCell.pieceID, active: isActive})
    })

    setCells(newCells)
  }

  const calculateMoves = (newMove: {fromCell: {ID: string, pieceID: string | null}, toCell: {ID: string, pieceID: string | null}, active: boolean}) => {
    let similarMoveIndex = moves.findIndex(move => move.fromCell.ID === newMove.fromCell.ID && move.fromCell.pieceID === newMove.fromCell.pieceID && move.toCell.ID === newMove.toCell.ID && move.toCell.pieceID === newMove.toCell.pieceID)
    let activeMoveIndex = moves.findIndex(move => move.active === true)

    if (similarMoveIndex !== -1 && similarMoveIndex === activeMoveIndex + 1) {
      setMoves(
        moves.map((move, i) => {
          if (i === similarMoveIndex) {
            return {...move, active: true}
          }
          return {...move, active: false}
        })
      )
    } else {
      setMoves(
        moves.slice(0, activeMoveIndex + 1).map((move) => {
          return {...move, active: false}
        }).concat(
          [newMove]
        )
      )
    }
  }

  const toMove = (moveIndex: number):void => {
    let activeMoveIndex = moves.findIndex(move => move.active === true)

    if (activeMoveIndex === moveIndex) return

    setMoves(
      moves.map((move, i) => {
        // if (i !== 0) setIsWhitePlayerCurrent(!isWhitePlayerCurrent)

        if (i === moveIndex) {
          return {...move, active: true}
        }
        return {...move, active: false}
      })
    )

    let newMoves = moves.slice(0, moveIndex + 1)

    let isWhite:boolean = true
    for (let index in newMoves) {
      isWhite = !isWhite
    }
    setIsWhitePlayerCurrent(isWhite)

    recalculateBoardState(newMoves)
  }

  return (
    <div className="App">
      <BoardFlipper flipBoard={flipBoard} />
      <Board cells={cells} onCellClick={onCellClick} isBoardFlipped={isBoardFlipped} rememberedCell={rememberedCell} />
      <ControlPanel cells={cells} isWhitePlayerCurrent={isWhitePlayerCurrent} moves={moves} onResetGame={resetGame} onMoveBack={moveBack} onMoveForward={moveForward} onMoveHistory={toMove} />
    </div>
  );
}

export default App;
