import "./BoardRow.css"

import BoardCell from "../BoardCell/BoardCell"

interface IProps {
  rowNum: number
  cells: Map<string, {pieceID: string | null, active: boolean}>
  pieces: Map<string, {description: string, codePoint: string}>
  onCellClick: (cellID: string) => void
  showCellNavigation: boolean
  isBoardFlipped: boolean
}

const BoardRow:React.FC<IProps> = ({rowNum, cells, pieces, onCellClick, showCellNavigation, isBoardFlipped}: IProps) => {
  const columnNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

  return (
    <div className="board-row">
      <span className="board-row__navigation">{rowNum}</span>
      {
        Array.from(cells).map(([ID, {pieceID, active}], i, {length}) => {
          let piece = pieceID === null ? null : pieces.get(pieceID)
          let codePoint = piece === null || piece === undefined ? '' : piece.codePoint
          let columnName = isBoardFlipped ? columnNames[7 - i] : columnNames[i]

          return <BoardCell key={ID} cellID={ID} showCellNavigation={showCellNavigation} codePoint={codePoint} onCellClick={onCellClick} columnName={columnName} active={active} />
        })
      }
    </div>
  )
}

export default BoardRow
