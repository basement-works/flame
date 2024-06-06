import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('Hono API endpoint'))

export default app
