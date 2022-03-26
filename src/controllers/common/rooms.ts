import { Request, Response, NextFunction } from 'express'
import { io } from '@app'
import { compare } from 'bcrypt'
import { getNumberOfParticipantsInRoom } from '@utils/socket'
import { getRoomByRoomId, createRoom, getRoomPasswordHashByRoomId } from '@db-api/room'

import {
    IRoomBaseFromServer,
    IRoomBaseFromClient,
    IPrivateRoom,
    IRoomBaseFromServerWithParticipants,
} from '@entityTypes/room'
import { generateHashPassword } from '@utils/room'

export const getRoomById: (req: Request, res: Response, next: NextFunction) => void = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const roomId: string = req.params.id
        const room: IRoomBaseFromServer | null = await getRoomByRoomId(roomId)

        let roomWithParticipants: IRoomBaseFromServerWithParticipants | null = null

        if (room) {
            roomWithParticipants = {
                ...room,
                numberOfParticipants: getNumberOfParticipantsInRoom(io, roomId),
            }
        }

        res.send(roomWithParticipants)
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

export const loginToRoom: (req: Request, res: Response, next: NextFunction) => Promise<void> = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const roomId: string = req.params.id
        const password: string = req.body.password

        const roomPasswordInfo: { passwordHash: string } | null = await getRoomPasswordHashByRoomId(roomId)

        let result: boolean = true

        if (roomPasswordInfo && roomPasswordInfo.passwordHash) {
            result = await compare(password, roomPasswordInfo.passwordHash)
        }

        res.send(result)
    } catch (error) {
        console.error(error)
        next(error)
    }
}
