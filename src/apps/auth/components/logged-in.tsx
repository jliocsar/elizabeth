import type { User } from 'lucia'

type TProps = {
  user: User
}

export function LoggedIn({ user }: TProps) {
  return (
    <div>
      <p>Currently logged in as {user.email}</p>
    </div>
  )
}
