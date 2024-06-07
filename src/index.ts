import { Hono } from 'hono'
import { Routes } from '@/src/routes'

const app = new Hono().basePath('/api/v1')
app.get('/', (c) => c.text('Welcome to @bsmnt-works Hono x Bun API 🔥'))
app.route('/books', Routes)

export default {
    port: 6969,
    fetch: app.fetch, 
}