import "./ChessBoardSquare.css";

import * as R from 'ramda'

import { PIECES } from "../../store/constants"
import { Square } from "../../store/interfaces"

interface IProps {
  square: Square
  isActive: boolean
  navigation: string
  onSquareClick: (square: Square) => void
}

const ChessBoardSquare:React.FC<IProps> = ({square, isActive, navigation, onSquareClick}: IProps) => {
  const piece: () => string = () => PIECES.get(square.pieceID)?.codePoint as string

  let classNames = 'board__square board__square--movable'
  if (isActive) classNames += ' board__square--active'

  return (
    <div className={classNames} onClick={() => onSquareClick(square)}>
      <span className="board__square--navigation">{navigation}</span>
      <span className="board_square--figure">{piece()}</span>
    </div>
  )
}

export default ChessBoardSquare
