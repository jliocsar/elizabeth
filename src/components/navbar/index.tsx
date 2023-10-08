export function Navbar() {
  return (
    <nav>
      <div hx-get="/auth/me" hx-swap="outerHTML" hx-trigger="load" />
      <button type="button" hx-post="/auth/sign-out">
        Sign out
      </button>
    </nav>
  )
}
