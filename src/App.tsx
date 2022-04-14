import { useState } from 'react'
import { cloneDeep } from "lodash"

import './App.css'

import Board from './components/Board/Board'
import ControlPanel from './components/ControlPanel/ControlPanel'

import { INITIAL_CELLS, INITIAL_BOARD } from "./store/constants"
import { Cell, Move, BoardInterface } from "./store/interfaces"

function App() {
  const [boards, setBoards] = useState<Array<BoardInterface>>([cloneDeep(INITIAL_BOARD)])

  const activeBoard = boards.find((board: BoardInterface) => board.active) || cloneDeep(INITIAL_BOARD)
  const activeCell = activeBoard.cells.find((cell: Cell) => cell.meta.active === true)
  const activeBoardIndex = boards.findIndex(board => board === activeBoard)

  const onCellClick = (clickedCell: Cell):void => {
    if (!clickedCell.meta.movable) return

    if (activeBoard.finalized) {
      addBoard(clickedCell)
    } else {
      updateActiveBoard(clickedCell)
    }
  }

  const addBoard = (clickedCell: Cell) => {
    let newBoard = {
      ...activeBoard,
      finalized: false,
      cells: activeBoard.cells.map((cell) => ({...cell, meta: { ...cell.meta, active: cell.ID === clickedCell.ID }}))
    }

    let nextBoard = boards[activeBoardIndex + 1]

    if (nextBoard === newBoard) {
      setBoards(
        boards.map((board) => {
          if (board === nextBoard) return {...board, active: true}
          return {...board, active: false}
        })
      )
    } else {
      setBoards(
        boards.slice(0, activeBoardIndex + 1).map((board) => {
          return {...board, active: false}
        }).concat([newBoard])
      )
    }
  }

  const updateActiveBoard = (clickedCell: Cell) => {
    setBoards(
      boards.map((board: BoardInterface) => {
        if (board === activeBoard) {
          board.isWhitePlayerCurrent = !board.isWhitePlayerCurrent
          board.finalized = true
          board.cells = calculatedCells(clickedCell)
          board.moves = calculatedMoves(clickedCell)
        }

        return board
      })
    )
  }


  const calculatedCells = (clickedCell: Cell):Array<Cell> => {
    return activeBoard.cells.map((cell: Cell) => {
      if (cell.ID === clickedCell.ID) {
        return {...cell, pieceID: activeCell!.pieceID, meta: { ...cell.meta, active: true, movable: true }}
      }

      if (cell.ID === activeCell!.ID) {
        return {...cell, pieceID: '', meta: { ...cell.meta, active: true, movable: true }}
      }

      return {...cell, meta: { ...cell.meta, active: false }}
    }).reverse()
  }

  const calculatedMoves = (clickedCell: Cell):Array<Move> => {
    let move = {fromCell: activeCell as Cell, toCell: clickedCell, active: true}

    return (
      activeBoard.moves.map(move => {
        return {...move, active: false}
      }).concat(
        [move]
      )
    )
  // const calculatedMoves = (clickedCell: Cell, rememberedCell: Cell) => {
    // let newMove = {fromCell: rememberedCell, toCell: clickedCell, active: true}
    // let similarMoveIndex = currentBoard.moves.findIndex(move => move === newMove)
    // let activeMoveIndex = currentBoard.moves.findIndex(move => move.active)

    // if (similarMoveIndex !== -1 && similarMoveIndex === activeMoveIndex + 1) {
      // return (
        // currentBoard.moves.map((move, i) => {
          // if (i === similarMoveIndex) {
            // return {...move, active: true}
          // }
          // return {...move, active: false}
        // })
      // )
    // }

    // return (
      // currentBoard.moves.slice(0, activeMoveIndex + 1).map((move) => {
        // return {...move, active: false}
      // }).concat(
        // [newMove]
      // )
    // )
  }

  const resetGame = () => {
    setBoards([cloneDeep(INITIAL_BOARD)])
  }

  const moveBack = () => {
    if (activeBoardIndex === 0) return

    setBoards(
      boards.map((board, i) => {
        if (i === activeBoardIndex) return {...board, active: false}
        if (i + 1 === activeBoardIndex) return {...board, active: true}

        return board
      })
    )
  }

  const moveForward = () => {
    if (activeBoardIndex === boards.length - 1) return

    setBoards(
      boards.map((board, i) => {
        if (i === activeBoardIndex) return {...board, active: false}
        if (i - 1 === activeBoardIndex) return {...board, active: true}

        return board
      })
    )
  }

  const recalculateBoardState = (moves: {fromCell: {ID: string, pieceID: string | null}, toCell: {ID: string, pieceID: string | null}, active: boolean}[]) => {
    // let newCells = new Map(INITIAL_CELLS)

    // moves.map((move, i, {length}) => {
      // let isActive = i === length - 1 ? true : false

      // newCells.set(move.fromCell.ID, {pieceID: null, active: isActive})
      // newCells.set(move.toCell.ID, {pieceID: move.fromCell.pieceID, active: isActive})
    // })

    // setCells(newCells)
  }

  const toMove = (moveIndex: number):void => {
    // let activeMoveIndex = moves.findIndex(move => move.active === true)

    // if (activeMoveIndex === moveIndex) return

    // setMoves(
      // moves.map((move, i) => {
        // // if (i !== 0) setIsWhitePlayerCurrent(!isWhitePlayerCurrent)

        // if (i === moveIndex) {
          // return {...move, active: true}
        // }
        // return {...move, active: false}
      // })
    // )

    // let newMoves = moves.slice(0, moveIndex + 1)

    // let isWhite:boolean = true
    // for (let index in newMoves) {
      // isWhite = !isWhite
    // }
    // setIsWhitePlayerCurrent(isWhite)

    // recalculateBoardState(newMoves)
  }

  return (
    <div className="App">
      <Board cells={activeBoard.cells} onCellClick={onCellClick} />
      <ControlPanel currentBoard={activeBoard} onResetGame={resetGame} onMoveBack={moveBack} onMoveForward={moveForward} onMoveHistory={toMove} />
    </div>
  );
}

export default App;
