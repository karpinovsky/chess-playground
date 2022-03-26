export interface Cell {
  ID: string
  pieceID: string
  meta: {
    active: boolean
    striped: boolean
    movable: boolean
  }
}
