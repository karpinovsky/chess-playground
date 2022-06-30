import "./ChessBoardRank.css";

import * as R from 'ramda'

import { INITIAL_SQUARES, PIECES, BOARD_COLUMNS } from "../../store/constants"
import { Square } from "../../store/interfaces"
import { Player } from "../../store/enums"

import ChessBoardSquare from '../ChessBoardSquare/ChessBoardSquare'

interface IProps {
  moves: Square[]
  currentMovesCounter: number
  onSquareClick: (square: Square) => void
  squares: Square[]
  rowNumber: number
}

const ChessBoardRank:React.FC<IProps> = ({moves, currentMovesCounter, onSquareClick, squares, rowNumber}: IProps) => {
  const closedCurrentMovesCounter: () => number = () => R.subtract(currentMovesCounter, R.modulo(currentMovesCounter, 2))

  const currentPlayer: () => Player = () => R.modulo(closedCurrentMovesCounter() / 2, 2) === 0 ? Player.White : Player.Black

  const calcColumnName: (columnNumber: number) => string = (columnNumber) => BOARD_COLUMNS.get(currentPlayer() === Player.White ? columnNumber : R.subtract(8, R.inc(columnNumber)))!

  const movesInPairs: () => Square[][] = () => R.splitEvery(2, R.take(currentMovesCounter, moves))

  const isSquareActive: (square: Square) => boolean = (square) => R.any(R.propEq('ID', square.ID), R.or(R.last(movesInPairs()), []))

  return (
    <div className="board__rank">
      <div className="board__rank--navigation">{rowNumber}</div>
      {
        squares.map((square: Square, columnNumber: number) => {
          let columnName = calcColumnName(columnNumber)
          let navigation

          if (currentPlayer() === Player.White) {
            navigation = rowNumber === 1 ? columnName : ''
          } else {
            navigation = rowNumber === 8 ? columnName : ''
          }

          return (
            <ChessBoardSquare key={columnName} square={square} isActive={isSquareActive(square)} navigation={navigation} onSquareClick={onSquareClick} />
          )
        })

      }
    </div>
  )
}

export default ChessBoardRank
