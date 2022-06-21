import { Cell } from "./interfaces"

export const PIECES = new Map<string, {description: string, codePoint: string}>([
  ['', { description: 'Empty cell', codePoint: '' }],

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

export const INITIAL_CELLS:Cell[] = [
  {ID: 'A8', pieceID: 'BR1'},
  {ID: 'B8', pieceID: 'BN1'},
  {ID: 'C8', pieceID: 'BB1'},
  {ID: 'D8', pieceID: 'BQ'},
  {ID: 'E8', pieceID: 'BK'},
  {ID: 'F8', pieceID: 'BB2'},
  {ID: 'G8', pieceID: 'BN2'},
  {ID: 'H8', pieceID: 'BR2'},

  {ID: 'A7', pieceID: 'BP1'},
  {ID: 'B7', pieceID: 'BP2'},
  {ID: 'C7', pieceID: 'BP3'},
  {ID: 'D7', pieceID: 'BP4'},
  {ID: 'E7', pieceID: 'BP5'},
  {ID: 'F7', pieceID: 'BP6'},
  {ID: 'G7', pieceID: 'BP7'},
  {ID: 'H7', pieceID: 'BP8'},

  {ID: 'A6', pieceID: ''},
  {ID: 'B6', pieceID: ''},
  {ID: 'C6', pieceID: ''},
  {ID: 'D6', pieceID: ''},
  {ID: 'E6', pieceID: ''},
  {ID: 'F6', pieceID: ''},
  {ID: 'G6', pieceID: ''},
  {ID: 'H6', pieceID: ''},

  {ID: 'A5', pieceID: ''},
  {ID: 'B5', pieceID: ''},
  {ID: 'C5', pieceID: ''},
  {ID: 'D5', pieceID: ''},
  {ID: 'E5', pieceID: ''},
  {ID: 'F5', pieceID: ''},
  {ID: 'G5', pieceID: ''},
  {ID: 'H5', pieceID: ''},

  {ID: 'A4', pieceID: ''},
  {ID: 'B4', pieceID: ''},
  {ID: 'C4', pieceID: ''},
  {ID: 'D4', pieceID: ''},
  {ID: 'E4', pieceID: ''},
  {ID: 'F4', pieceID: ''},
  {ID: 'G4', pieceID: ''},
  {ID: 'H4', pieceID: ''},

  {ID: 'A3', pieceID: ''},
  {ID: 'B3', pieceID: ''},
  {ID: 'C3', pieceID: ''},
  {ID: 'D3', pieceID: ''},
  {ID: 'E3', pieceID: ''},
  {ID: 'F3', pieceID: ''},
  {ID: 'G3', pieceID: ''},
  {ID: 'H3', pieceID: ''},

  {ID: 'A2', pieceID: 'WP1'},
  {ID: 'B2', pieceID: 'WP2'},
  {ID: 'C2', pieceID: 'WP3'},
  {ID: 'D2', pieceID: 'WP4'},
  {ID: 'E2', pieceID: 'WP5'},
  {ID: 'F2', pieceID: 'WP6'},
  {ID: 'G2', pieceID: 'WP7'},
  {ID: 'H2', pieceID: 'WP8'},

  {ID: 'A1', pieceID: 'WR1'},
  {ID: 'B1', pieceID: 'WN1'},
  {ID: 'C1', pieceID: 'WB1'},
  {ID: 'D1', pieceID: 'WQ'},
  {ID: 'E1', pieceID: 'WK'},
  {ID: 'F1', pieceID: 'WB2'},
  {ID: 'G1', pieceID: 'WN2'},
  {ID: 'H1', pieceID: 'WR2'},
]
