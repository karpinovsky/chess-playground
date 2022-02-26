import "./CurrentPlayer.css"

interface IProps {
  isWhitePlayerCurrent: boolean
}

const CurrentPlayer:React.FC<IProps> = ({isWhitePlayerCurrent}: IProps) => {
  return (
    <p className="control-panel__current_player">{ isWhitePlayerCurrent ? "White move" : "Black move" }</p>
  )
}

export default CurrentPlayer
