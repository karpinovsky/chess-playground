import "./ChessBoardRank.css";

import * as R from 'ramda'

import { INITIAL_SQUARES, PIECES, BOARD_COLUMNS } from "../../store/constants"
import { Square } from "../../store/interfaces"
import { Player } from "../../store/enums"

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
          let classNames = 'board__square board__square--movable'

          if (isSquareActive(square)) classNames += ' board__square--active'

          let chessFigure = PIECES.get(square.pieceID)?.codePoint

          return (
            <div key={columnNumber} className={classNames} onClick={() => onSquareClick(square)}>
              { rowNumber === 1 ? <span className="board__square--navigation">{calcColumnName(columnNumber)}</span> : null }
              <span className='board__square--figure'>{chessFigure}</span>
            </div>
          )
        })

      }
    </div>
  )
}

export default ChessBoardRank
