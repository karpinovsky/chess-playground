import "./BoardFlipper.css"

interface IProps {
  flipBoard: () => void
}

const BoardFlipper:React.FC<IProps> = ({flipBoard}: IProps) => {
  return (
    <div className="board-flipper">
      <div className="board-flipper__img" onClick={() => flipBoard()} />
    </div>
  )
}

export default BoardFlipper
