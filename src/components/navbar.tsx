export function Navbar() {
  return (
    <nav>
      <button type="button" hx-post="/auth/sign-out">
        Sign out
      </button>
    </nav>
  )
}
