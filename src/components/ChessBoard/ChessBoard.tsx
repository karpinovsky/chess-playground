import "./ChessBoard.css";

import * as R from 'ramda'

import { INITIAL_SQUARES, PIECES, BOARD_COLUMNS } from "../../store/constants"
import { Square } from "../../store/interfaces"
import { Player } from "../../store/enums"

interface IProps {
  moves: Square[]
  currentMovesCounter: number
  onSquareClick: (square: Square) => void
}

const ChessBoard:React.FC<IProps> = ({moves, currentMovesCounter, onSquareClick}: IProps) => {
  const board: () => Square[] = () => currentPlayer() === Player.White ? squares() : R.reverse(squares())

  const squares: () => Square[] = () => R.map(R.mergeAll, R.values(groupedSquaresFromMoves()))

  const currentPlayer: () => Player = () => R.modulo(closedCurrentMovesCounter() / 2, 2) === 0 ? Player.White : Player.Black

  const groupedSquaresFromMoves: () => (Record<string, Square[]>) = () => R.groupBy((square: Square) => square.ID)(R.concat(INITIAL_SQUARES, squaresFromMoves()) as Square[])

  const closedCurrentMovesCounter: () => number = () => R.subtract(currentMovesCounter, R.modulo(currentMovesCounter, 2))

  const movesInPairs: () => Square[][] = () => R.splitEvery(2, R.take(currentMovesCounter, moves))

  const closedMovesInPairs: () => Square[][] = () => R.splitEvery(2, R.take(closedCurrentMovesCounter(), moves))

  const squaresFromMoves: () => Square[] = () => R.flatten(R.map(computeMoves, closedMovesInPairs()))

  const computeMoves: (moves: Square[]) => Square[] = (moves) => R.pipe(movePieceToNewSquare, dropPieceFromPrevSquare)(moves)

  const movePieceToNewSquare: (move: Square[]) => Square[] = (move) => R.update(1, R.assoc('pieceID', move[0].pieceID, move[1]))(move)

  const dropPieceFromPrevSquare: (move: Square[]) => Square[] = (move) => R.update(0, R.assoc('pieceID', '', move[0]))(move)

  const isSquareActive: (square: Square) => boolean = (square) => R.any(R.propEq('ID', square.ID), R.or(R.last(movesInPairs()), []))

  const boardRowNumber: (row: number) => number = (row) => currentPlayer() === Player.White ? R.subtract(8, row) : R.inc(row)

  const boardColumnName: (column: number) => string = (column) => BOARD_COLUMNS.get(currentPlayer() === Player.White ? column : R.subtract(8, R.inc(column)))!

  return (
    <div className="board">
      {
        R.splitEvery(8, board()).map((row: Square[], i: number) => {
          return (
            <div key={i} className="board__row">
              <div className="board__row--navigation">{boardRowNumber(i)}</div>
              {
                row.map((square: Square, j: number) => {
                  let classNames = 'board__square board__square--movable'

                  if (isSquareActive(square)) classNames += ' board__square--active'

                  let chessFigure = PIECES.get(square.pieceID)?.codePoint

                  return (
                    <div key={j} className={classNames} onClick={() => onSquareClick(square)}>
                      { i === 7 ? <span className="board__square--navigation">{boardColumnName(j)}</span> : null }
                      <span className='board__square--figure'>{chessFigure}</span>
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
