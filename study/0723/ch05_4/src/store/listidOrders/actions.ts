import type * as T from './types'

export const setListidOrders = (payload: T.State): T.SetListidOrders => ({
  type: '@ListidOrders/set',
  payload
})

export const addListidOrders = (payload: T.UUID): T.AddListidOrders => ({
  type: '@listidOrders/add',
  payload
})

export const removeListidFromOrders = (payload: T.UUID): T.RemoveListidFromOrders => ({
  type: '@listidOrders/remove',
  payload
})
