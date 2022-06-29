import "./ChessBoard.css";

import * as R from 'ramda'

import ChessBoardRank from '../ChessBoardRank/ChessBoardRank'

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
        R.splitEvery(8, board()).map((squares: Square[], rowNumber: number) => {
          return (
            <ChessBoardRank key={rowNumber} squares={squares} onSquareClick={onSquareClick} moves={moves} currentMovesCounter={currentMovesCounter} rowNumber={calcRowNumber(rowNumber)} />
          )
        })
      }
    </div>
  )
}

export default ChessBoard
