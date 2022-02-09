import "./Cell.css"

interface IProps {
  ID: string
  htmlCode: string
  onCellClick: (cellID: string) => void
}

const Cell:React.FC<IProps> = ({ID, htmlCode, onCellClick}: IProps) => {
  return (
    <td dangerouslySetInnerHTML={{__html: htmlCode}} onClick={() => onCellClick(ID)} />
  )
}

export default Cell
