import path from 'path'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { createServer, Server as HttpServer } from 'http'
import express, { Application, Router, Request, Response } from 'express'

const pathToEnv: string = path.resolve('.env')
dotenv.config({ path: pathToEnv })

// for pretty path in import expression
import 'module-alias/register'

import initSocket from './socket/index'

const app: Application = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
    res.send('OK')
})

app.use(router)

const httpServer: HttpServer = createServer(app)
initSocket(httpServer)

httpServer.listen(Number.parseInt(process.env.PORT as string), () => {
    console.log(`Server running on port ${process.env.PORT}`)
})
