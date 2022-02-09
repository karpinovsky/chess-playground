import "./Board.css";

import Row from "../Row/Row";

interface IProps {
  cells: Map<string, string | null>
  pieces: Map<string, {description: string, htmlCode: string}>
  onCellClick: (cellID: string) => void
}

const Board:React.FC<IProps> = ({cells, pieces, onCellClick}: IProps) => {
  return (
    <table className="board">
      <tbody>
        {
          [...Array(8)].map((_, i) => {
            let rowStart:number = 8 * i;
            let rowEnd:number = rowStart +8;
            let row = new Map(Array.from(cells).slice(rowStart, rowEnd))

            return <Row key={8 - i} cells={row} pieces={pieces} onCellClick={onCellClick} />
          })
        }
      </tbody>
    </table>
  )
}

export default Board
