import { Router, Request, Response, NextFunction } from 'express'

const router: Router = new Router()

router.get('/keep-alive-ping', (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send('OK')
    } catch (error) {
        console.error(error)
        next(error)
    }
})

export default router
