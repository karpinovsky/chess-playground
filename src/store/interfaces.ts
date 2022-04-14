export interface Cell {
  ID: string
  pieceID: string
  meta: {
    active: boolean
    striped: boolean
    movable: boolean
  }
}

export interface Move {
  fromCell: Cell
  toCell: Cell
  active: boolean
}

export interface BoardInterface {
  isWhitePlayerCurrent: boolean
  cells: Array<Cell>
  moves: Array<Move>
  active: boolean
  finalized: boolean
}
