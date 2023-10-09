import Html from '@kitajs/html'

export function Navbar({ children }: Html.PropsWithChildren) {
  return (
    <div class="navbar-container">
      <nav>{children}</nav>
      <img src="/public/static/werewolf.png" width="48" height="48" />
    </div>
  )
}