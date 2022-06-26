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

  const currentPlayer: () => Player = () => R.modulo(closedCurrentMovesCounter() / 2, 2) === 0 ? Player.White : Player.Black

  const squares: () => Square[] = () => R.map(R.mergeAll, R.values(groupedSquaresFromMoves()))

  const groupedSquaresFromMoves: () => (Record<string, Square[]>) = () => R.groupBy((square: Square) => square.ID)(R.concat(INITIAL_SQUARES, squaresFromMoves()) as Square[])

  const closedCurrentMovesCounter: () => number = () => R.subtract(currentMovesCounter, R.modulo(currentMovesCounter, 2))

  const movesInPairs: () => Square[][] = () => R.splitEvery(2, R.take(currentMovesCounter, moves))

  const closedMovesInPairs: () => Square[][] = () => R.splitEvery(2, R.take(closedCurrentMovesCounter(), moves))

  const squaresFromMoves: () => Square[] = () => R.flatten(R.map(computeMoves, closedMovesInPairs()))

  const computeMoves: (moves: Square[]) => Square[] = (moves) => R.pipe(movePieceToNewSquare, dropPieceFromPrevSquare)(moves)

  const movePieceToNewSquare: (move: Square[]) => Square[] = (move) => R.update(1, R.assoc('pieceID', move[0].pieceID, move[1]))(move)

  const dropPieceFromPrevSquare: (move: Square[]) => Square[] = (move) => R.update(0, R.assoc('pieceID', '', move[0]))(move)

  const isSquareActive: (square: Square) => boolean = (square) => R.any(R.propEq('ID', square.ID), R.or(R.last(movesInPairs()), []))

  const calcRowNumber: (rowNumber: number) => number = (rowNumber) => currentPlayer() === Player.White ? R.subtract(8, rowNumber) : R.inc(rowNumber)

  const calcColumnName: (columnNumber: number) => string = (columnNumber) => BOARD_COLUMNS.get(currentPlayer() === Player.White ? columnNumber : R.subtract(8, R.inc(columnNumber)))!

  return (
    <div className="board">
      {
        R.splitEvery(8, board()).map((row: Square[], rowNumber: number) => {
          return (
            <div key={rowNumber} className="board__row">
              <div className="board__row--navigation">{calcRowNumber(rowNumber)}</div>
              {
                row.map((square: Square, columnNumber: number) => {
                  let classNames = 'board__square board__square--movable'

                  if (isSquareActive(square)) classNames += ' board__square--active'

                  let chessFigure = PIECES.get(square.pieceID)?.codePoint

                  return (
                    <div key={columnNumber} className={classNames} onClick={() => onSquareClick(square)}>
                      { rowNumber === 7 ? <span className="board__square--navigation">{calcColumnName(columnNumber)}</span> : null }
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
