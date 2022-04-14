import "./ControlPanel.css"

import { BoardInterface, Cell, Move } from "../../store/interfaces"
import { PIECES } from "../../store/constants"
import { chunk } from "lodash"

interface IProps {
  currentBoard: BoardInterface
  onResetGame: () => void
  onMoveBack: () => void
  onMoveForward: () => void
  onMoveHistory: (moveIndex: number) => void
}

const ControlPanel:React.FC<IProps> = ({currentBoard, onResetGame, onMoveBack, onMoveForward, onMoveHistory}: IProps) => {
  const handleNewGameClick = () => {
    return window.confirm("Are you sure?") ? onResetGame() : null
  }

  const printMove = (move: Move, moveIndex: number):React.ReactNode => {
    if (move === undefined) return

    let classNames = 'control-panel__moves-history__list__item-value'
    if (move.active) classNames += ' control-panel__moves-history__list__item-value--active'

    let fromPiece = PIECES.get(move.fromCell.pieceID)

    let text:string
    if (move.fromCell.pieceID.startsWith("WP") || move.fromCell.pieceID.startsWith("BP")) {
      if (move.toCell.pieceID === '') {
        text = move.toCell.ID.toLowerCase()
      } else {
        text = `${move.fromCell.ID[0].toLowerCase()}x${move.toCell.ID.toLowerCase()}`
      }
    } else if (move.toCell?.pieceID === '') {
      text = `${fromPiece?.codePoint}${move.toCell.ID.toLowerCase()}`
    } else {
      text = `${fromPiece?.codePoint}x${move.toCell.ID.toLowerCase()}`
    }

    return <span className={classNames} onClick={() => onMoveHistory(moveIndex)}>{text}</span>
  }

  return (
    <div className="control-panel">
      <p className="control-panel__current_player">{ currentBoard.isWhitePlayerCurrent ? "White move" : "Black move" }</p>

      <div className="control-panel__moves-history">
        <ol className="control-panel__moves-history__list">
          {
            chunk(currentBoard.moves, 2).map(([firstMove, secondMove], i) => {
              return (
                <li key={i} className="control-panel__moves-history__list__item">
                  {printMove(firstMove, i * 2)}
                  {printMove(secondMove, i * 2 + 1)}
                </li>
              )
            })
          }
        </ol>
      </div>

      <div className="control-panel__commands">
        <button className="btn control-panel__commands__new-game-btn" onClick={() => handleNewGameClick()}>New Game</button>
        <button className="btn control-panel__commands__move-back-btn" onClick={() => onMoveBack()}>Move Back</button>
        <button className="btn control-panel__commands__move-forward-btn" onClick={() => onMoveForward()}>Move Forward</button>
      </div>
    </div>
  )
}

export default ControlPanel
