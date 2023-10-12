import { Layout } from '@components/layout'
import { css } from '../styles.css'
import { Navbar } from './navbar'

export function Index() {
  return (
    <Layout title="Login" styles={css}>
      <Navbar>
        <a href="/auth/sign-up">Register</a>
      </Navbar>
      <div hx-ext="response-targets">
        <h1>Login</h1>
        <form
          hx-indicator=".htmx-indicator"
          hx-post="/auth/sign-in"
          hx-target-4xx=".error"
          hx-target-5xx=".error"
        >
          <input
            class="email"
            type="email"
            name="email"
            placeholder="Email"
            required="true"
          />
          <input
            class="password"
            type="password"
            name="password"
            placeholder="Password"
            required="true"
          />
          <button type="submit">Login</button>
          <img
            class="htmx-indicator"
            src="/public/static/spin.svg"
            width="40"
            height="40"
          />
        </form>
        <div class="error" />
      </div>
    </Layout>
  )
}
