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
    }
  }[]
  pieces: Map<string, {description: string, codePoint: string}>
  onResetGame: () => void
}

const ControlPanel:React.FC<IProps> = ({cells, isWhitePlayerCurrent, moves, pieces, onResetGame}: IProps) => {
  return (
    <div className="control-panel">
      <CurrentPlayer isWhitePlayerCurrent={isWhitePlayerCurrent} />
      <MovesHistory cells={cells} moves={moves} pieces={pieces} />
      <Commands onResetGame={onResetGame}/>
    </div>
  )
}

export default ControlPanel
