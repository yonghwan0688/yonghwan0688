import type {DropResult} from 'react-beautiful-dnd'
import {useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import type {AppState} from '../store'
import type {List} from '../store/commonTypes'
import * as LO from '../store/listidOrders'
import * as L from '../store/listEntities'
import * as C from '../store/cardEntities'
import * as LC from '../store/listidCardidOrders'
import * as U from '../utils'

export const useLists = () => {
  const dispatch = useDispatch()

  const lists = useSelector<AppState, List[]>(({listidOrders, listEntities}) =>
    listidOrders.map((uuid: string) => listEntities[uuid])
  )

  const listidCardidOrders = useSelector<AppState, LC.State>(
    ({listidCardidOrders}) => listidCardidOrders
  )

  const listidOrders = useSelector<AppState, LO.State>(({listidOrders}) => listidOrders)

  const onCreateList = useCallback(
    (uuid: string, title: string) => {
      const list = {uuid, title}
      dispatch(LO.addListidOrders(uuid))
      dispatch(L.addList(list))
      dispatch(LC.setListidCardids({listed: uuid, cardids: []}))
      // Initialize the list with an empty array of card IDs
    },
    [dispatch]
  )

  const onRemoveList = useCallback(
    (listid: string) => () => {
      listidCardidOrders[listid]?.forEach(cardid => {
        dispatch(C.removeCard(cardid))
      })
      dispatch(L.removeList(listid))
      dispatch(LO.removeListidFromOrders(listid))
      dispatch(LC.removeListid(listid))
    },
    [dispatch]
  )

  const onMoveList = useCallback(
    (sourceIndex: number, destinationIndex: number) => {
      // 현재 listidOrders 상태를 가져와서 새 배열 생성
      const currentOrder = listidOrders
      const newOrder = [...currentOrder]
      const [removed] = newOrder.splice(sourceIndex, 1)
      newOrder.splice(destinationIndex, 0, removed)
      dispatch(LO.setListidOrders(newOrder))
    },
    [dispatch, listidOrders]
  )

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return

      const {source, destination} = result
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return
      }

      if (source.droppableId === 'board') {
        onMoveList(source.index, destination.index)
      } else {
        // Handle card reordering within a list if needed
      }
    },
    [onMoveList]
  )

  return {
    lists,
    onCreateList,
    onRemoveList,
    onMoveList,
    onDragEnd
  }
}
