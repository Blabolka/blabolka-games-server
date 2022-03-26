import { Application } from 'express'

import keepAlive from '@routes/keepAlive'
import roomRoutes from '@routes/common/rooms'

const initRoutes: (app: Application) => void = (app: Application) => {
    app.use('/', keepAlive)
    app.use('/room', roomRoutes)
}

export default initRoutes
