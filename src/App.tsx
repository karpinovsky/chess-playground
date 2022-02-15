import React, { useState } from 'react'

import './App.css'

import BoardFlipper from './components/BoardFlipper/BoardFlipper'
import Board from './components/Board/Board'
import ControlPanel from './components/ControlPanel/ControlPanel'

const PIECES = new Map<string, {description: string, codePoint: string}>([
  ['WR1', { description: 'White Rook 1', codePoint: '\u2656' }],
  ['WN1', { description: 'White Knight 1', codePoint: '\u2658' }],
  ['WB1', { description: 'White Bishop 1', codePoint: '\u2657' }],
  ['WQ', { description: 'White Queen', codePoint: '\u2655' }],
  ['WK', { description: 'White King', codePoint: '\u2654' }],
  ['WB2', { description: 'White Bishop 2', codePoint: '\u2657' }],
  ['WN2', { description: 'White Knight 2', codePoint: '\u2658' }],
  ['WR2', { description: 'White Rook 2', codePoint: '\u2656' }],

  ['WP1', { description: 'White Pawn 1', codePoint: '\u2659' }],
  ['WP2', { description: 'White Pawn 2', codePoint: '\u2659' }],
  ['WP3', { description: 'White Pawn 3', codePoint: '\u2659' }],
  ['WP4', { description: 'White Pawn 4', codePoint: '\u2659' }],
  ['WP5', { description: 'White Pawn 5', codePoint: '\u2659' }],
  ['WP6', { description: 'White Pawn 6', codePoint: '\u2659' }],
  ['WP7', { description: 'White Pawn 7', codePoint: '\u2659' }],
  ['WP8', { description: 'White Pawn 8', codePoint: '\u2659' }],

  ['BP1', { description: 'Black Pawn 1', codePoint: '\u265F' }],
  ['BP2', { description: 'Black Pawn 2', codePoint: '\u265F' }],
  ['BP3', { description: 'Black Pawn 3', codePoint: '\u265F' }],
  ['BP4', { description: 'Black Pawn 4', codePoint: '\u265F' }],
  ['BP5', { description: 'Black Pawn 5', codePoint: '\u265F' }],
  ['BP6', { description: 'Black Pawn 6', codePoint: '\u265F' }],
  ['BP7', { description: 'Black Pawn 7', codePoint: '\u265F' }],
  ['BP8', { description: 'Black Pawn 8', codePoint: '\u265F' }],

  ['BR1', { description: 'Black Rook 1', codePoint: '\u265C' }],
  ['BN1', { description: 'Black Knight 1', codePoint: '\u265E' }],
  ['BB1', { description: 'Black Bishop 1', codePoint: '\u265D' }],
  ['BQ', { description: 'Black Queen', codePoint: '\u265B' }],
  ['BK', { description: 'Black King', codePoint: '\u265A' }],
  ['BB2', { description: 'Black Bishop 2', codePoint: '\u265D' }],
  ['BN2', { description: 'Black Knight 2', codePoint: '\u265E' }],
  ['BR2', { description: 'Black Rook 2', codePoint: '\u265C' }],
])

function App() {
  const [cells, setCells] = useState(
    new Map<string, {pieceID: string | null, active: boolean}>([
      ['A8', {pieceID: 'BR1', active: false}],
      ['B8', {pieceID: 'BN1', active: false}],
      ['C8', {pieceID: 'BB1', active: false}],
      ['D8', {pieceID: 'BQ', active: false}],
      ['E8', {pieceID: 'BK', active: false}],
      ['F8', {pieceID: 'BB2', active: false}],
      ['G8', {pieceID: 'BN2', active: false}],
      ['H8', {pieceID: 'BR2', active: false}],

      ['A7', {pieceID: 'BP1', active: false}],
      ['B7', {pieceID: 'BP2', active: false}],
      ['C7', {pieceID: 'BP3', active: false}],
      ['D7', {pieceID: 'BP4', active: false}],
      ['E7', {pieceID: 'BP5', active: false}],
      ['F7', {pieceID: 'BP6', active: false}],
      ['G7', {pieceID: 'BP7', active: false}],
      ['H7', {pieceID: 'BP8', active: false}],

      ['A6', {pieceID: null, active: false}],
      ['B6', {pieceID: null, active: false}],
      ['C6', {pieceID: null, active: false}],
      ['D6', {pieceID: null, active: false}],
      ['E6', {pieceID: null, active: false}],
      ['F6', {pieceID: null, active: false}],
      ['G6', {pieceID: null, active: false}],
      ['H6', {pieceID: null, active: false}],

      ['A5', {pieceID: null, active: false}],
      ['B5', {pieceID: null, active: false}],
      ['C5', {pieceID: null, active: false}],
      ['D5', {pieceID: null, active: false}],
      ['E5', {pieceID: null, active: false}],
      ['F5', {pieceID: null, active: false}],
      ['G5', {pieceID: null, active: false}],
      ['H5', {pieceID: null, active: false}],

      ['A4', {pieceID: null, active: false}],
      ['B4', {pieceID: null, active: false}],
      ['C4', {pieceID: null, active: false}],
      ['D4', {pieceID: null, active: false}],
      ['E4', {pieceID: null, active: false}],
      ['F4', {pieceID: null, active: false}],
      ['G4', {pieceID: null, active: false}],
      ['H4', {pieceID: null, active: false}],

      ['A3', {pieceID: null, active: false}],
      ['B3', {pieceID: null, active: false}],
      ['C3', {pieceID: null, active: false}],
      ['D3', {pieceID: null, active: false}],
      ['E3', {pieceID: null, active: false}],
      ['F3', {pieceID: null, active: false}],
      ['G3', {pieceID: null, active: false}],
      ['H3', {pieceID: null, active: false}],

      ['A2', {pieceID: 'WP1', active: false}],
      ['B2', {pieceID: 'WP2', active: false}],
      ['C2', {pieceID: 'WP3', active: false}],
      ['D2', {pieceID: 'WP4', active: false}],
      ['E2', {pieceID: 'WP5', active: false}],
      ['F2', {pieceID: 'WP6', active: false}],
      ['G2', {pieceID: 'WP7', active: false}],
      ['H2', {pieceID: 'WP8', active: false}],

      ['A1', {pieceID: 'WR1', active: false}],
      ['B1', {pieceID: 'WN1', active: false}],
      ['C1', {pieceID: 'WB1', active: false}],
      ['D1', {pieceID: 'WQ', active: false}],
      ['E1', {pieceID: 'WK', active: false}],
      ['F1', {pieceID: 'WB2', active: false}],
      ['G1', {pieceID: 'WN2', active: false}],
      ['H1', {pieceID: 'WR2', active: false}],
    ])
  )

  const [rememberedCell, setRememberedCell] = useState<{ID: string, pieceID: string | null} | null>()
  const [isBoardFlipped, setIsBoardFlipped] = useState<boolean>(false)
  const [isWhitePlayerCurrent, setIsWhitePlayerCurrent] = useState<boolean>(true)

  const onCellClick = (cellID: string):void => {
    let currentCell = {ID: cellID, pieceID: cells.get(cellID)?.pieceID as string | null}

    if (rememberedCell === null || rememberedCell === undefined) {
      if (currentCell.pieceID === null) {
        return
      }

      setRememberedCell(currentCell)
      return
    }

    setCells(
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
    )
    setRememberedCell(null)
    setIsWhitePlayerCurrent(!isWhitePlayerCurrent)
  }

  const flipBoard = ():void => {
    setCells(
      new Map(Array.from(cells).reverse())
    )
    setIsBoardFlipped(!isBoardFlipped)
  }

  return (
    <div className="App">
      <BoardFlipper flipBoard={flipBoard} />
      <Board cells={cells} pieces={PIECES} onCellClick={onCellClick} isBoardFlipped={isBoardFlipped} />
      <ControlPanel isWhitePlayerCurrent={isWhitePlayerCurrent} />
    </div>
  );
}

export default App;
