import "./ControlPanel.css"

interface IProps {
  isWhitePlayerCurrent: boolean
}

const ControlPanel:React.FC<IProps> = ({isWhitePlayerCurrent}: IProps) => {
  return (
    <div className="control-panel">
      <p className="control-panel__current_player">{ isWhitePlayerCurrent ? "White move" : "Black move" }</p>
    </div>
  )
}

export default ControlPanel
