import "./Commands.css"

interface IProps {
  onResetGame: () => void
  onMoveBack: () => void
  onMoveForward: () => void
}

const Commands:React.FC<IProps> = ({onResetGame, onMoveBack, onMoveForward}: IProps) => {
  let handleNewGameClick = () => {
    return window.confirm("Are you sure?") ? onResetGame() : null
  }

  return (
    <div className="control-panel__commands">
      <button className="btn control-panel__commands__new-game-btn" onClick={() => handleNewGameClick()}>New Game</button>
      <button className="btn control-panel__commands__move-back-btn" onClick={() => onMoveBack()}>Move Back</button>
      <button className="btn control-panel__commands__move-forward-btn" onClick={() => onMoveForward()}>Move Forward</button>
    </div>
  )
}

export default Commands
