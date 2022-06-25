import "./ControlPanel.css"

import { Square } from "../../store/interfaces"
import { Player } from "../../store/enums"
import { PIECES } from "../../store/constants"

import * as R from 'ramda'

interface IProps {
  moves: Square[]
  currentMovesCounter: number
  onNewGame: () => void
  onMoveBack: () => void
  onMoveForward: () => void
  onMoveClick: (idx: number) => void
}

const ControlPanel:React.FC<IProps> = ({moves, currentMovesCounter, onNewGame, onMoveBack, onMoveForward, onMoveClick}: IProps) => {
  const currentClosedMovesCount: () => number = () => Math.floor(R.divide(currentMovesCounter, 2))

  const closedMovesCount: () => number = () => Math.floor(R.divide(R.length(moves), 2))

  const currentPlayer: () => Player = () => R.modulo(currentClosedMovesCount(), 2) === 0 ? Player.White : Player.Black

  const handleNewGameClick: () => void = () => window.confirm("Are you sure?") ? onNewGame() : null

  const printMove = (source: Square, target: Square, moveIndex: number):React.ReactNode => {
    if (R.isNil(target)) return

    return <span className={classNames(moveIndex)} onClick={() => onMoveClick(moveIndex)}>{moveText(source, target)}</span>
  }

  const moveText: (source: Square, target: Square) => string =
    (source, target) => {
      let fromPiece = PIECES.get(source.pieceID)

      if (source.pieceID.startsWith("WP") || source.pieceID.startsWith("BP")) {
        if (target.pieceID === '') {
          return target.ID.toLowerCase()
        } else {
          return `${source.ID[0].toLowerCase()}x${target.ID.toLowerCase()}`
        }
      } else if (target.pieceID === '') {
        return `${fromPiece?.codePoint}${target.ID.toLowerCase()}`
      } else {
        return `${fromPiece?.codePoint}x${target.ID.toLowerCase()}`
      }
    }

  const classNames: (idx: number) => string =
    (idx) =>
      R.pipe(
        applyActiveMoveClass(idx)
      )(moveClass())

  const moveClass: () => string = () => 'control-panel__moves-history__list__item-value'

  const applyActiveMoveClass: (idx: number) => (classNames: string) => string =
    (idx) =>
      (classNames) =>
        R.and(R.equals(currentMoveIdx(), idx), R.equals(R.modulo(currentMovesCounter, 2), 0)) ? R.concat(classNames, ` ${activeMoveClass()}`) : classNames

  const currentMoveIdx: () => number = () => Math.ceil(R.divide(currentMovesCounter, 2))

  const activeMoveClass: () => string = () => R.concat(moveClass(), '--active')

  return (
    <div className="control-panel">
      <p className="control-panel__current_player">{`${currentPlayer()} move`}</p>

      <div className="control-panel__moves-history">
        <ol className="control-panel__moves-history__list">
          {
            R.splitEvery(4, R.take(R.multiply(closedMovesCount())(2), moves)).map(([move1, move2, move3, move4], i) => {
              return (
                <li key={i} className="control-panel__moves-history__list__item">
                  {printMove(move1, move2, R.add(R.multiply(i)(2), 1))}
                  {printMove(move3, move4, R.add(R.multiply(i)(2), 2))}
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
