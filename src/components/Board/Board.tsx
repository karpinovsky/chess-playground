import "./Board.css";

import BoardRow from "../BoardRow/BoardRow";

interface IProps {
  cells: Map<string, {pieceID: string | null, active: boolean}>
  pieces: Map<string, {description: string, codePoint: string}>
  onCellClick: (cellID: string) => void
  isBoardFlipped: boolean
}

const Board:React.FC<IProps> = ({cells, pieces, onCellClick, isBoardFlipped}: IProps) => {
  return (
    <div className="board">
      {
        [...Array(8)].map((_, i, {length}) => {
          let rowStart:number = 8 * i;
          let rowEnd:number = rowStart +8;
          let row = new Map(Array.from(cells).slice(rowStart, rowEnd))
          let rowNum = isBoardFlipped ? i + 1 : 8 - i
          let showCellNavigation = i + 1 === length ? true : false

          return <BoardRow key={rowNum} rowNum={rowNum} cells={row} pieces={pieces} onCellClick={onCellClick} showCellNavigation={showCellNavigation} isBoardFlipped={isBoardFlipped} />
        })
      }
    </div>
  )
}

export default Board
