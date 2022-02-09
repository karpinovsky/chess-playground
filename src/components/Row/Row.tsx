import "./Row.css"

import Cell from "../Cell/Cell"

interface IProps {
  cells: Map<string, string | null>
  pieces: Map<string, {description: string, htmlCode: string}>
  onCellClick: (cellID: string) => void
}

const Row:React.FC<IProps> = ({cells, pieces, onCellClick}: IProps) => {
  return (
    <tr>
      {
        Array.from(cells).map(([ID, pieceID]) => {
          let piece = pieceID === null ? null : pieces.get(pieceID)
          let htmlCode = piece === null || piece === undefined ? '' : piece.htmlCode

          return <Cell key={ID} ID={ID} htmlCode={htmlCode} onCellClick={onCellClick} />
        })
      }
    </tr>
  )
}

export default Row
