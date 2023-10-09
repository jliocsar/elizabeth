import type { UserSchema } from 'lucia'

type TProps = {
  user: UserSchema
}

export function LoggedIn({ user }: TProps) {
  return (
    <div>
      <p>
        Currently logged in as <b>{user.email}</b>
      </p>
    </div>
  )
}
