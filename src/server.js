import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import config from './config'
import cors from 'cors'
import { connect } from './utils/db'

export const app = express()
app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

const router = express.Router()

router
  .route('/')
  .get((_req, res) => res.send('hello get'))
  .post((_req, res) => res.send('hello post'))

router
  .route('/:id')
  .get((_req, res) => res.send('hello get id'))
  .put((_req, res) => res.send('hello put id'))
  .delete((_req, res) => res.send('hello delete id'))

app.use(router)

app.get('/api/routes', (req, res) => {
  res.send(router.stack.find(
    elem => elem.route.path === '/:id' && elem.route.methods['delete']
  ))
})
export async function start() {
  try {
    await connect()

    app.listen(config.port, () =>
      console.log(`REST API on http://localhost:${config.port}/api`)
    )
  } catch (e) {
    console.error(e)
  }
}
