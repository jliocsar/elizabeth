import Html from '@kitajs/html'
import whiteCrow from '@static/crow-white_size=48x48.png'

export function Navbar({ children }: Html.PropsWithChildren) {
  return (
    <div class="navbar-container">
      <nav>{children}</nav>
      <img src={whiteCrow} alt="crow logo" width="48" height="48" />
    </div>
  )
}
