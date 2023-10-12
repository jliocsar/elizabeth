import { type TThingy, Thingy } from './thingy'

type TProps = {
  id: string
  thingies: TThingy[]
}

export function ThingiesList({ id, thingies }: TProps) {
  return (
    <ul id={id}>
      {thingies.map(thingy => (
        <Thingy thingy={thingy} />
      ))}
    </ul>
  )
}
