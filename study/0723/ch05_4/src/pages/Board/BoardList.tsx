import React from 'react'
import type {List} from '../../store/commonTypes'

interface BoardListProps {
  list: List
  onRemoveList: () => void
  index: number
  onMoveList: (sourceIndex: number, destinationIndex: number) => void
}

const BoardList: React.FC<BoardListProps> = ({list, onRemoveList, index}) => {
  return (
    <div className="board-list" key={list.uuid}>
      <h3>{list.title}</h3>
      <button onClick={onRemoveList}>Remove</button>
      {/* 카드 목록 등 추가 가능 */}
    </div>
  )
}

export default BoardList
