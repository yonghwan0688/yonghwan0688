import type {Action} from 'redux'
import type {UUID} from '../commonTypes'
export * from '../commonTypes'

export type State = UUID[]

export type SetListidOrders = Action<'@ListidOrders/set'> & {
  payload: State
}

export type AddListidOrders = Action<'@listidOrders/add'> & {
  payload: UUID
}

export type RemoveListidFromOrders = Action<'@listidOrders/remove'> & {
  payload: UUID
}

export type Actions = SetListidOrders | AddListidOrders | RemoveListidFromOrders
