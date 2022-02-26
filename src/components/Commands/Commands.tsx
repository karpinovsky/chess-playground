import "./Commands.css"

interface IProps {
  onResetGame: () => void
}

const Commands:React.FC<IProps> = ({onResetGame}: IProps) => {
  let handleClick = () => {
    return window.confirm("Are you sure?") ? onResetGame() : null
  }

  return (
    <div className="control-panel__commands">
      <button className="btn control-panel__commands__new-game-btn" onClick={() => handleClick()}>New Game</button>
      <button className="btn control-panel__commands__move-back-btn">Move Back</button>
      <button className="btn control-panel__commands__move-forward-btn">Move Forward</button>
    </div>
  )
}

export default Commands
