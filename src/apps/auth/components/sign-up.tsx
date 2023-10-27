import { Layout } from '@components/layout'
import css from '../styles.css'
import { Navbar } from './navbar'

export function SignUp() {
  return (
    <Layout title="Sign up" styles={css}>
      <Navbar>
        <a href="/auth">Go back</a>
      </Navbar>
      <div hx-ext="response-targets">
        <h1>Sign Up</h1>
        <form
          hx-indicator=".htmx-indicator"
          hx-post="/auth/sign-up"
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
          <input
            type="password"
            name="confirm-password"
            placeholder="Confirm password"
            required="true"
            _="on htmx:validation:validate
              if my.value != .password.value
                call me.setCustomValidity('Passwords do not match')
              else
                call me.setCustomValidity('')"
          />
          <button type="submit">Sign up</button>
          <img class="htmx-indicator" src="/public/static/spin.svg" />
        </form>
        <div class="error" />
      </div>
    </Layout>
  )
}
