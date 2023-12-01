import type { TSelectThingy } from '../../../db/schema'

export type TThingy = Pick<TSelectThingy, 'name'>
type TProps = {
  thingy: TThingy
}

export function Thingy({ thingy }: TProps) {
  return <li safe>{thingy.name}</li>
}
