import { Request, Response, NextFunction } from 'express'

export const getRoomById: (req: Request, res: Response, next: NextFunction) => void = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        res.send('ok')
    } catch (error) {
        console.log(error)
        next(error)
    }
}
