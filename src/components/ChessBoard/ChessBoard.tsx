import "./ChessBoard.css";

import * as R from 'ramda'

import { INITIAL_CELLS, PIECES, BOARD_COLUMNS } from "../../store/constants"
import { Cell } from "../../store/interfaces"
import { Player } from "../../store/enums"

interface IProps {
  moves: Cell[]
  currentMovesCounter: number
  onCellClick: (cell: Cell) => void
}

const ChessBoard:React.FC<IProps> = ({moves, currentMovesCounter, onCellClick}: IProps) => {
  const board: () => Cell[] = () => currentPlayer() === Player.White ? cells() : R.reverse(cells())

  const cells: () => Cell[] = () => R.map(R.mergeAll, R.values(groupedCellsFromMoves()))

  const currentPlayer: () => Player = () => R.modulo(closedCurrentMovesCounter() / 2, 2) === 0 ? Player.White : Player.Black

  const groupedCellsFromMoves: () => (Record<string, Cell[]>) = () => R.groupBy((cell: Cell) => cell.ID)(R.concat(INITIAL_CELLS, cellsFromMoves()) as Cell[])

  const closedCurrentMovesCounter: () => number = () => R.subtract(currentMovesCounter, R.modulo(currentMovesCounter, 2))

  const movesInPairs: () => Cell[][] = () => R.splitEvery(2, R.take(currentMovesCounter, moves))

  const closedMovesInPairs: () => Cell[][] = () => R.splitEvery(2, R.take(closedCurrentMovesCounter(), moves))

  const cellsFromMoves: () => Cell[] = () => R.flatten(R.map(computeMoves, closedMovesInPairs()))

  const computeMoves: (moves: Cell[]) => Cell[] = (moves) => R.pipe(movePieceToNewCell, dropPieceFromPrevCell)(moves)

  const movePieceToNewCell: (move: Cell[]) => Cell[] = (move) => R.update(1, R.assoc('pieceID', move[0].pieceID, move[1]))(move)

  const dropPieceFromPrevCell: (move: Cell[]) => Cell[] = (move) => R.update(0, R.assoc('pieceID', '', move[0]))(move)

  const isCellActive: (cell: Cell) => boolean = (cell) => R.any(R.propEq('ID', cell.ID), R.or(R.last(movesInPairs()), []))

  const boardRowNumber: (row: number) => number = (row) => currentPlayer() === Player.White ? R.subtract(8, row) : R.inc(row)

  const boardColumnName: (column: number) => string = (column) => BOARD_COLUMNS.get(currentPlayer() === Player.White ? column : R.subtract(8, R.inc(column)))!

  return (
    <div className="board">
      {
        R.splitEvery(8, board()).map((row: Cell[], i: number) => {
          return (
            <div key={i} className="board__row">
              <div className="board__row--navigation">{boardRowNumber(i)}</div>
              {
                row.map((cell: Cell, j: number) => {
                  let classNames = 'board__cell board__cell--movable'

                  if (isCellActive(cell)) classNames += ' board__cell--active'

                  let chessFigure = PIECES.get(cell.pieceID)?.codePoint

                  return (
                    <div key={j} className={classNames} onClick={() => onCellClick(cell)}>
                      { i === 7 ? <span className="board__cell--navigation">{boardColumnName(j)}</span> : null }
                      <span className='board__cell--figure'>{chessFigure}</span>
                    </div>
                  )
                })

              }
            </div>
          )
        })
      }
    </div>
  )
}

export default ChessBoard
