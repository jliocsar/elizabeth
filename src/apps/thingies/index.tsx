import { Elysia } from 'elysia'

import { Layout } from '../../components/layout'

export const thingiesApp = new Elysia({ name: 'thingies' })
  .get('/', () => (
    <Layout title="Thingies" className="main">
      <header>
        <h1>Thingies</h1>
      </header>
      <main>HTMX rules!</main>
    </Layout>
  ))
  .get('/thingies', () => {})
