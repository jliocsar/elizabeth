export function ThingiesList() {
  return (
    <main id="thingies-list" hx-ext="response-targets">
      HTMX rules!
      <form
        hx-delete="/thingies"
        hx-target="#thingies-list"
        hx-target-4xx=".error"
        hx-target-500=".error"
      >
        <button type="submit">Delete all thingies</button>
      </form>
      <form
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
        hx-trigger="load, htmx:afterRequest from:form"
        hx-target="this"
      />
      <img class="htmx-indicator" src="/public/static/spin.svg"></img>
      <div class="success"></div>
      <div class="error"></div>
    </main>
  )
}
