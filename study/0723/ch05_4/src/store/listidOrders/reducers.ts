import * as T from './types'

const initialState: T.State = []

export const reducer = (state: T.State = initialState, action: T.Actions): T.State => {
  switch (action.type) {
    case '@ListidOrders/set':
      return action.payload
    case '@listidOrders/add':
      return [...state, action.payload]
    case '@listidOrders/remove':
      return state.filter(uuid => uuid !== action.payload)
  }
  return state
}
