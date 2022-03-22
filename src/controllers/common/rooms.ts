import { Request, Response, NextFunction } from 'express'
import { createRoom } from '@db-api/room'

import { RoomBase, RoomModelType } from '@entityTypes/room'

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

export const postRoom: (req: Request, res: Response, next: NextFunction) => Promise<void> = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const roomInfo: RoomBase = req.body
        const room: RoomModelType = await createRoom(roomInfo)

        res.send(room)
    } catch (error) {
        console.error(error)
        next(error)
    }
}
