import type {DropResult} from 'react-beautiful-dnd'
import {useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {createSelector} from 'reselect'
import type {AppState} from './AppState'
import type {List} from './commonTypes'
import * as LO from '../store/listidOrders'
import * as L from '../store/listEntities'
import * as C from '../store/cardEntities'
import * as LC from '../store/listidCardidOrders'
import * as U from '../utils'

export const useLists = () => {
  const dispatch = useDispatch()

  // reselect를 사용하여 memoized selector 생성
  const selectLists = createSelector(
    [(state: AppState) => state.listidOrders, (state: AppState) => state.listEntities],
    (listidOrders, listEntities) => listidOrders.map(uuid => listEntities[uuid])
  )
  const lists = useSelector(selectLists)
  const listidCardidOrders = useSelector<AppState, LC.State>(
    ({listidCardidOrders}) => listidCardidOrders
  )

  const listidOrders = useSelector<AppState, LO.State>(({listidOrders}) => listidOrders)

  const onCreateList = useCallback(
    (uuid: string, title: string) => {
      const list = {uuid, title}
      dispatch(LO.addListidToOrders(uuid)) // listidOrders 추가
      dispatch(L.addList(list)) // listEntities 추가
      dispatch(LC.setListidCardids({listid: uuid, cardids: []})) // listidCardidOrders 추가
    },
    [dispatch]
  )

  const onRemoveList = useCallback(
    (listid: string) => () => {
      listidCardidOrders[listid].forEach(cardid => {
        dispatch(C.removeCard(cardid)) // cardEntities 삭제
      })
      dispatch(LC.removeListid(listid)) // listidCardidOrders 삭제

      dispatch(L.removeList(listid)) // listEntities 삭제
      dispatch(LO.removeListidFromOrders(listid)) // listidOrders 삭제
    },
    [dispatch, listidCardidOrders]
  )

  const onMoveList = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const newOrders = listidOrders.map((item, index) =>
        index === dragIndex
          ? listidOrders[hoverIndex]
          : index === hoverIndex
          ? listidOrders[dragIndex]
          : item
      )
      dispatch(LO.setListidOrders(newOrders)) // listidOrders 통째로 바꾸기
    },
    [dispatch, listidOrders]
  )

  const onDragEnd = useCallback(
    (result: DropResult) => {
      console.log('onDragEnd result', result)
      const destinationListid = result.destination?.droppableId
      const destinationCardIndex = result.destination?.index
      if (destinationListid === undefined || destinationCardIndex === undefined) return

      const sourceListid = result.source.droppableId
      const sourceCardIndex = result.source.index

      // 같은 리스트안에서 이동
      if (destinationListid === sourceListid) {
        const cardidOrders = listidCardidOrders[destinationListid]
        // listidCardidOrders의 cardidOrders에서 자리 바꾸기
        dispatch(
          LC.setListidCardids({
            listid: destinationListid,
            cardids: U.swapItemsInArray(
              cardidOrders,
              sourceCardIndex,
              destinationCardIndex
            )
          })
        )
      } else {
        const sourceCardidOrders = listidCardidOrders[sourceListid]
        // listidCardidOrders의 cardidOrders에서 sourceCardIndex에 위치한 cardid 삭제
        dispatch(
          LC.setListidCardids({
            listid: sourceListid,
            cardids: U.removeItemAtIndexInArray(sourceCardidOrders, sourceCardIndex)
          })
        )
        const destinationCardidOrders = listidCardidOrders[destinationListid]
        // listidCardidOrders의 cardidOrders에서 destinationCardIndex 위치에 cardid 삽입
        dispatch(
          LC.setListidCardids({
            listid: destinationListid,
            cardids: U.insertItemAtIndexInArray(
              destinationCardidOrders,
              destinationCardIndex,
              result.draggableId
            )
          })
        )
      }
    },
    [dispatch, listidCardidOrders]
  )

  return {lists, onCreateList, onRemoveList, onMoveList, onDragEnd}
}
