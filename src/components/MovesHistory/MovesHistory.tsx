import "./MovesHistory.css"

interface IProps {
  cells: Map<string, {pieceID: string | null, active: boolean}>
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
  onMoveHistory: (moveIndex: number) => void
}

const pairSize:number = 2

const MovesHistory:React.FC<IProps> = ({cells, moves, pieces, onMoveHistory}: IProps) => {
  let movesInPairs = () => {
    let a = []

    for (let i = 0; i < moves.length; i += pairSize) {
      a.push(moves.slice(i, i + pairSize))
    }

    return a
  }

  let printMove = ({fromCell, toCell, active}: {fromCell: {ID: string, pieceID: string | null}, toCell: {ID: string, pieceID: string | null}, active: boolean}):string => {
    let fromPiece = pieces.get(fromCell.pieceID as string)
    if (fromCell.pieceID?.startsWith("WP") || fromCell.pieceID?.startsWith("BP")) {
      if (toCell.pieceID === null) {
        return toCell.ID.toLowerCase()
      } else {
        return `${fromCell.ID[0].toLowerCase()}x${toCell.ID.toLowerCase()}`
      }
    }

    if (toCell?.pieceID === null) {
      return `${fromPiece?.codePoint}${toCell.ID.toLowerCase()}`
    } else {
      return `${fromPiece?.codePoint}x${toCell.ID.toLowerCase()}`
    }
  }

  return (
    <div className="control-panel__moves-history">
      <ol className="control-panel__moves-history__list">
        {
            movesInPairs().map(([firstMove, secondMove], i) => {
              return (
                <li key={i} className="control-panel__moves-history__list__item">
                  <span className={`control-panel__moves-history__list__item-value${firstMove.active ? ' control-panel__moves-history__list__item-value--active' : ''}`} onClick={() => onMoveHistory(i * 2)}>{printMove(firstMove)}</span>
                  { secondMove !== undefined ? <span className={`control-panel__moves-history__list__item-value${secondMove.active ? ' control-panel__moves-history__list__item-value--active' : ''}`} onClick={() => onMoveHistory(i * 2 + 1)}>{printMove(secondMove)}</span> : null }
                </li>
              )
            })
        }
      </ol>
    </div>
  )
}

export default MovesHistory
