import path from 'path'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { Server } from 'socket.io'
import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Application } from 'express'
import { createServer, Server as HttpServer } from 'http'

const pathToEnv: string = path.resolve('.env')
dotenv.config({ path: pathToEnv })

// for pretty path in import expression
import 'module-alias/register'

// database connection
import connectToMongoDatabase from '@db'
connectToMongoDatabase()
    .then(() => console.log('Connected to db'))
    .catch((error: Error) => {
        console.error(error)
        process.exit(1)
    })

import corsOptions from '@middleware/cors'
import limiter from '@middleware/rateLimit'
const app: Application = express()

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(limiter)

const httpServer: HttpServer = createServer(app)
export const io: Server = new Server(httpServer, {
    cors: corsOptions,
})

import initRoutes from '@routes/index'

initRoutes(app)

import initSocket from '@socket/index'

initSocket(io)

httpServer.listen(Number.parseInt(process.env.PORT as string), () => {
    console.log(`Server running on port ${process.env.PORT}`)
})
