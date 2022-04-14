import "./Board.css";

import { PIECES } from "../../store/constants"
import { Cell } from "../../store/interfaces"

interface IProps {
  cells: Array<Cell>
  onCellClick: (cell: Cell) => void
}

const Board:React.FC<IProps> = ({cells, onCellClick}: IProps) => {
  return (
    <div className="board">
      {
        cells.map((cell: Cell, i: number) => {
          let classNames = 'board__cell'

          if (cell.meta.striped)     classNames += ' board__cell--striped'
          if (cell.meta.active)      classNames += ' board__cell--active'
          if (cell.meta.movable)     classNames += ' board__cell--movable'

          let chessFigure = PIECES.get(cell.pieceID)?.codePoint

          return (
            <div key={i} className={classNames} onClick={() => onCellClick(cell)}>
              {chessFigure}
            </div>
          )
        })
      }
    </div>
  )
}

export default Board
