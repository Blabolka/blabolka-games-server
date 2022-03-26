import { Request, Response, NextFunction } from 'express'
import { getRoomByRoomId, createRoom } from '@db-api/room'

import { IRoomBaseFromServer, IRoomBaseFromClient, IPrivateRoom } from '@entityTypes/room'
import { generateHashPassword } from '@utils/room'

export const getRoomById: (req: Request, res: Response, next: NextFunction) => void = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const id: string = req.params.id
        const room: IRoomBaseFromServer | null = await getRoomByRoomId(id)

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
        const room: IRoomBaseFromClient = req.body

        const databaseRoomInfo: IPrivateRoom = {
            roomType: room.roomType,
            roomInfo: room.roomInfo,
            isPrivate: room.isPrivate,
        }

        if (room.isPrivate && room.password) {
            databaseRoomInfo.passwordHash = await generateHashPassword(room.password)
        }

        const createdRoom: IRoomBaseFromServer | null = await createRoom(databaseRoomInfo)

        res.send(createdRoom)
    } catch (error) {
        console.error(error)
        next(error)
    }
}
