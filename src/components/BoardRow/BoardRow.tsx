import "./BoardRow.css"

import { PIECES } from "../../store/constants"
import BoardCell from "../BoardCell/BoardCell"

interface IProps {
  rowNum: number
  cells: Map<string, {pieceID: string | null, active: boolean}>
  onCellClick: (cellID: string) => void
  showCellNavigation: boolean
  isBoardFlipped: boolean
  rememberedCell: {
    ID: string
    pieceID: string | null
  } | null
}

const BoardRow:React.FC<IProps> = ({rowNum, cells, onCellClick, showCellNavigation, isBoardFlipped, rememberedCell}: IProps) => {
  const columnNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

  return (
    <div className="board-row">
      <span className="board-row__navigation">{rowNum}</span>
      {
        Array.from(cells).map(([ID, {pieceID, active}], i, {length}) => {
          let piece = pieceID === null ? null : PIECES.get(pieceID)
          let disabled = (piece === null || piece === undefined) && rememberedCell === null ? true : false
          let codePoint = piece === null || piece === undefined ? '' : piece.codePoint
          let columnName = isBoardFlipped ? columnNames[7 - i] : columnNames[i]

          return <BoardCell key={ID} cellID={ID} showCellNavigation={showCellNavigation} codePoint={codePoint} onCellClick={onCellClick} columnName={columnName} active={active} disabled={disabled} />
        })
      }
    </div>
  )
}

export default BoardRow
