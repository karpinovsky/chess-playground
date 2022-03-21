import "./BoardCell.css"

interface IProps {
  cellID: string
  codePoint: string
  onCellClick: (cellID: string) => void
  showCellNavigation: boolean
  columnName: string
  active: boolean
  disabled: boolean
}

const BoardCell:React.FC<IProps> = ({cellID, codePoint, onCellClick, showCellNavigation, columnName, active, disabled}: IProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, cellID: string):void => {
    if (disabled === true) return

    (e.target as HTMLDivElement).classList.add('board-column--active')
    onCellClick(cellID)
  }

  return (
    <div className={`board-column${active ? ' board-column--active' : ''}${disabled ? ' cursor-default' : ''}`} onClick={(e) => handleClick(e, cellID)}>
      {showCellNavigation === true ? <span className="board-column__navigation">{columnName}</span> : null}
      {codePoint}
    </div>
  )
}

export default BoardCell
