import React, { useState } from 'react';

import './App.css';

import Board from './components/Board/Board';

const PIECES = new Map<string, {description: string, htmlCode: string}>([
  ['WR1', { description: "White Rook 1", htmlCode: "&#9814;" }],
  ['WN1', { description: "White Knight 1", htmlCode: "&#9816;" }],
  ['WB1', { description: "White Bishop 1", htmlCode: "&#9815;" }],
  ['WQ', { description: "White Queen", htmlCode: "&#9813" }],
  ['WK', { description: "White King", htmlCode: "&#9812" }],
  ['WB2', { description: "White Bishop 2", htmlCode: "&#9815;" }],
  ['WN2', { description: "White Knight 2", htmlCode: "&#9816;" }],
  ['WR2', { description: "White Rook 2", htmlCode: "&#9814;" }],

  ['WP1', { description: "White Pawn 1", htmlCode: "&#9817;" }],
  ['WP2', { description: "White Pawn 2", htmlCode: "&#9817;" }],
  ['WP3', { description: "White Pawn 3", htmlCode: "&#9817;" }],
  ['WP4', { description: "White Pawn 4", htmlCode: "&#9817;" }],
  ['WP5', { description: "White Pawn 5", htmlCode: "&#9817;" }],
  ['WP6', { description: "White Pawn 6", htmlCode: "&#9817;" }],
  ['WP7', { description: "White Pawn 7", htmlCode: "&#9817;" }],
  ['WP8', { description: "White Pawn 8", htmlCode: "&#9817;" }],

  ['BP1', { description: "Black Pawn 1", htmlCode: "&#9823;" }],
  ['BP2', { description: "Black Pawn 2", htmlCode: "&#9823;" }],
  ['BP3', { description: "Black Pawn 3", htmlCode: "&#9823;" }],
  ['BP4', { description: "Black Pawn 4", htmlCode: "&#9823;" }],
  ['BP5', { description: "Black Pawn 5", htmlCode: "&#9823;" }],
  ['BP6', { description: "Black Pawn 6", htmlCode: "&#9823;" }],
  ['BP7', { description: "Black Pawn 7", htmlCode: "&#9823;" }],
  ['BP8', { description: "Black Pawn 8", htmlCode: "&#9823;" }],

  ['BR1', { description: "Black Rook 1", htmlCode: "&#9820;" }],
  ['BN1', { description: "Black Knight 1", htmlCode: "&#9822;" }],
  ['BB1', { description: "Black Bishop 1", htmlCode: "&#9821;" }],
  ['BQ', { description: "Black Queen", htmlCode: "&#9819;" }],
  ['BK', { description: "Black King", htmlCode: "&#9818;" }],
  ['BB2', { description: "Black Bishop 2", htmlCode: "&#9821;" }],
  ['BN2', { description: "Black Knight 2", htmlCode: "&#9822;" }],
  ['BR2', { description: "Black Rook 2", htmlCode: "&#9820;" }],
])

function App() {
  const [cells, setCells] = useState(
    new Map<string, string | null>([
      ['A8', 'BR1'],
      ['B8', 'BN1'],
      ['C8', 'BB1'],
      ['D8', 'BQ'],
      ['E8', 'BK'],
      ['F8', 'BB2'],
      ['G8', 'BN2'],
      ['H8', 'BR2'],

      ['A7', 'BP1'],
      ['B7', 'BP2'],
      ['C7', 'BP3'],
      ['D7', 'BP4'],
      ['E7', 'BP5'],
      ['F7', 'BP6'],
      ['G7', 'BP7'],
      ['H7', 'BP8'],

      ['A6', null ],
      ['B6', null ],
      ['C6', null ],
      ['D6', null ],
      ['E6', null ],
      ['F6', null ],
      ['G6', null ],
      ['H6', null ],

      ['A5', null ],
      ['B5', null ],
      ['C5', null ],
      ['D5', null ],
      ['E5', null ],
      ['F5', null ],
      ['G5', null ],
      ['H5', null ],

      ['A4', null ],
      ['B4', null ],
      ['C4', null ],
      ['D4', null ],
      ['E4', null ],
      ['F4', null ],
      ['G4', null ],
      ['H4', null ],

      ['A3', null ],
      ['B3', null ],
      ['C3', null ],
      ['D3', null ],
      ['E3', null ],
      ['F3', null ],
      ['G3', null ],
      ['H3', null ],

      ['A2', 'WP1'],
      ['B2', 'WP2'],
      ['C2', 'WP3'],
      ['D2', 'WP4'],
      ['E2', 'WP5'],
      ['F2', 'WP6'],
      ['G2', 'WP7'],
      ['H2', 'WP8'],

      ['A1', 'WR1'],
      ['B1', 'WN1'],
      ['C1', 'WB1'],
      ['D1', 'WQ'],
      ['E1', 'WK'],
      ['F1', 'WB2'],
      ['G1', 'WN2'],
      ['H1', 'WR2'],
    ])
  )

  const [rememberedCell, setRememberedCell] = useState<{ID: string, pieceID: string | null} | null>();

  const onCellClick = (cellID: string):void => {
    let currentCell = {ID: cellID, pieceID: cells.get(cellID) as string | null}

    if (rememberedCell === null || rememberedCell === undefined) {
      if (currentCell.pieceID === null) {
        return
      }

      setRememberedCell(currentCell)
      return
    }

    setCells(
      new Map(
        Array.from(cells).map(([ID, pieceID]) => {
          if (ID === cellID) {
            return [ID, rememberedCell.pieceID]
          }
          if (ID === rememberedCell.ID) {
            return [ID, null]
          }
          return [ID, pieceID]
        })
      )
    )
    setRememberedCell(null)
  }

  return (
    <div className="App">
      <Board cells={cells} pieces={PIECES} onCellClick={onCellClick} />
    </div>
  );
}

export default App;
