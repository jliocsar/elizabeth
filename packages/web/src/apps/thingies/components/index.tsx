import { type TSelectThingy } from '../../../db/schema/thingies'
import { Layout } from '@components/layout'
import { Navbar } from '@components/navbar'
import indicator from '@static/spin.svg'
import css from '../styles.css'
import { ThingiesList } from './thingies-list'

type TProps = {
  thingies: TSelectThingy[]
}

export function Index({ thingies }: TProps) {
  return (
    <Layout title="Thingies" styles={css}>
      <header>
        <Navbar />
        <h1>Thingies</h1>
      </header>
      <main id="thingies" hx-ext="response-targets">
        HTMX rules!
        <form
          class="create-thingy"
          hx-indicator=".htmx-indicator"
          hx-post="/thingies"
          hx-swap="beforeend"
          hx-target="#thingies-list"
          hx-target-4xx=".error"
          hx-target-500=".error"
        >
          <input name="name" />
          <button type="submit">Create thingy</button>
        </form>
        <ThingiesList id="thingies-list" thingies={thingies} />
        <img
          src={indicator}
          alt="loading indicator"
          class="htmx-indicator"
          width="40"
          height="40"
        />
        <div class="success" />
        <div class="error" />
        <button
          type="button"
          class="delete-all"
          hx-indicator=".htmx-indicator"
          hx-delete="/thingies"
          hx-swap="innerHTML"
          hx-target="#thingies-list"
          hx-target-4xx=".error"
          hx-target-500=".error"
          hx-confirm="Are you sure?"
        >
          Delete all thingies
        </button>
      </main>
    </Layout>
  )
}
