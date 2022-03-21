import "./ControlPanel.css"

import CurrentPlayer from "../CurrentPlayer/CurrentPlayer"
import MovesHistory from "../MovesHistory/MovesHistory"
import Commands from "../Commands/Commands"

interface IProps {
  cells: Map<string, {pieceID: string | null, active: boolean}>
  isWhitePlayerCurrent: boolean
  moves: {
    fromCell: {
      ID: string,
      pieceID: string | null
    },
    toCell: {
      ID: string,
      pieceID: string | null
    },
    active: boolean
  }[]
  pieces: Map<string, {description: string, codePoint: string}>
  onResetGame: () => void
  onMoveBack: () => void
  onMoveForward: () => void
  onMoveHistory: (moveIndex: number) => void
}

const ControlPanel:React.FC<IProps> = ({cells, isWhitePlayerCurrent, moves, pieces, onResetGame, onMoveBack, onMoveForward, onMoveHistory}: IProps) => {
  return (
    <div className="control-panel">
      <CurrentPlayer isWhitePlayerCurrent={isWhitePlayerCurrent} />
      <MovesHistory cells={cells} moves={moves} pieces={pieces} onMoveHistory={onMoveHistory} />
      <Commands onResetGame={onResetGame} onMoveBack={onMoveBack} onMoveForward={onMoveForward}/>
    </div>
  )
}

export default ControlPanel
