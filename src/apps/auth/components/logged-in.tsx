import type { UserSchema } from '../types'

type TProps = {
  user: UserSchema
}

export function LoggedIn({ user }: TProps) {
  return (
    <div>
      <p>Currently logged in as {user.email}</p>
    </div>
  )
}
