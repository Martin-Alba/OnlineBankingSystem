import express from 'express'
import bodyParser from 'body-parser'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import cors from 'cors'
import { startServer } from './src/config.js'
import userRoutes from './src/routes/user.routes.js'
import operationRoutes from './src/routes/operation.routes.js'
import ticketRoutes from './src/routes/tickets.routes.js'
import { authenticateJWT } from './src/middleware/protected-routes.middleware.js'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
app.use(express.static(`${__dirname}/../client`))

app.use(cors())
app.options('*', cors())
app.use(bodyParser.json())

app.get('/', async (req, res) => {
  res.json({ msg: 'Hello World' })
})

app.use('/api/users', userRoutes)
app.use('/api/banking-operation', authenticateJWT, operationRoutes)
app.use('/api/tickets', authenticateJWT, ticketRoutes)

startServer(app)
