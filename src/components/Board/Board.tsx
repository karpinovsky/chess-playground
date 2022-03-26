import "./Board.css";

import BoardRow from "../BoardRow/BoardRow";

import { PIECES } from "../../store/constants"
import { Cell } from "../../store/interfaces"

interface IProps {
  cells: Map<string, {pieceID: string, meta: { active: boolean, striped: boolean, movable: boolean }}>
  onCellClick: (cell: Cell) => void
  isBoardFlipped: boolean
  rememberedCell: {
    ID: string
    pieceID: string | null
  } | null
}

const Board:React.FC<IProps> = ({cells, onCellClick, isBoardFlipped, rememberedCell}: IProps) => {
  return (
    <div className="board">
      {
        Array.from(cells).map(([ID, cell], i, {length}) => {
          let classNames = 'board__cell'

          if (cell.meta.striped) classNames += ' board__cell--striped'
          if (cell.meta.active)  classNames += ' board__cell--active'
          if (cell.meta.movable) classNames += ' board__cell--movable'

          return (
            <div key={i} className={classNames} onClick={() => onCellClick({ID: ID, ...cell})}>
              {PIECES.get(cell.pieceID)?.codePoint}
            </div>
          )
        })
      }
    </div>
  )
}

export default Board
