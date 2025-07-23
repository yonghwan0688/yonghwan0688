import * as LO from './listidOrders/types'
import * as L from './listEntities/types'
import * as C from './cardEntities/types'
import * as LC from './listidCardidOrders/types'

export type AppState = {
  listidOrders: LO.State
  listEntities: L.State
  cardEntities: C.State
  listidCardidOrders: LC.State
}
