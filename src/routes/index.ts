import { Application } from 'express'

import roomRoutes from '@routes/common/rooms'

const initRoutes: (app: Application) => void = (app: Application) => {
    app.use('/room', roomRoutes)
}

export default initRoutes
