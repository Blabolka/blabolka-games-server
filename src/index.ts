import path from 'path'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { Server } from 'socket.io'
import bodyParser from 'body-parser'
import cors, { CorsOptions } from 'cors'
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

const app: Application = express()

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const corsOrigins: string | boolean =
    process.env.NODE_ENV === 'production'
        ? process.env.PRODUCTION_ALLOWED_CORS_ORIGINS || false
        : process.env.DEVELOPMENT_ALLOWED_CORS_ORIGINS || false

const corsOptions: CorsOptions = {
    origin: corsOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
}

app.use(cors(corsOptions))

const httpServer: HttpServer = createServer(app)
const io: Server = new Server(httpServer, {
    cors: corsOptions,
})

import initRoutes from '@routes/index'
initRoutes(app)

import initSocket from '@socket/index'
initSocket(io)

httpServer.listen(Number.parseInt(process.env.PORT as string), () => {
    console.log(`Server running on port ${process.env.PORT}`)
})
