import { Request, Response, NextFunction } from 'express'
import { getRoomByRoomId, createRoom } from '@db-api/room'

import { IRoomBase, IRoomModel } from '@entityTypes/room'

export const getRoomById: (req: Request, res: Response, next: NextFunction) => void = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const id: string = req.params.id
        const room: IRoomModel | null = await getRoomByRoomId(id)

        res.send(room)
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
        const roomInfo: IRoomBase = req.body
        const room: IRoomModel = await createRoom(roomInfo)

        res.send(room)
    } catch (error) {
        console.error(error)
        next(error)
    }
}
