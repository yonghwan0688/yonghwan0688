import type {ICard} from '../data'

export type UUID = string
export type List = {
  uuid: UUID
  title: string
}

export type Card = ICard
export type CardidListed = {
  card: Card
  listUuid: UUID
}

export type ListidCardid = {listed: UUID; cardids: UUID[]}
export type CardidListidIndex = CardidListed & {
  index: number
}
