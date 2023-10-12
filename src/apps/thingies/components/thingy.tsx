import type { SelectThingy } from '@db/schema'

export type TThingy = Pick<SelectThingy, 'name'>
type TProps = {
  thingy: TThingy
}

export function Thingy({ thingy }: TProps) {
  return <li>{thingy.name}</li>
}
