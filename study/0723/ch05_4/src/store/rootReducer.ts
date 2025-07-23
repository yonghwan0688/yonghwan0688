import {combineReducers} from 'redux'
import {reducer as listidOrders} from './listidOrders/reducers'
import {reducer as listEntities} from './listEntities/reducers'
import {reducer as cardEntities} from './cardEntities/reducers'
import {reducer as listidCardidOrders} from './listidCardidOrders/reducers'

export const rootReducer = combineReducers({
  listidOrders,
  listEntities,
  cardEntities,
  listidCardidOrders
})
