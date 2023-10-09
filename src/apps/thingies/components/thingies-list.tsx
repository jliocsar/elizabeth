export function ThingiesList() {
  return (
    <main id="thingies-list" hx-ext="response-targets">
      HTMX rules!
      <form
        class="create-thingy"
        hx-post="/thingies"
        hx-target="#thingies-list"
        hx-target-4xx=".error"
        hx-target-500=".error"
      >
        <input name="name" />
        <button type="submit">Create thingy</button>
      </form>
      <div
        class="thingies-list"
        hx-get="/thingies"
        hx-indicator=".htmx-indicator"
        hx-trigger="load"
        hx-target="this"
      />
      <img
        class="htmx-indicator"
        src="/public/static/spin.svg"
        width="32"
        height="32"
      />
      <div class="success" />
      <div class="error" />
      <button
        type="button"
        class="delete-all"
        hx-delete="/thingies"
        hx-target="#thingies-list"
        hx-target-4xx=".error"
        hx-target-500=".error"
        hx-confirm="Are you sure?"
      >
        Delete all thingies
      </button>
    </main>
  )
}
