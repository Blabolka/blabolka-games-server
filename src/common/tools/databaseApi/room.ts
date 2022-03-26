import mongoose from 'mongoose'
import RoomModel from '@models/Room'
import { IPrivateRoom, IRoomBaseFromServer } from '@entityTypes/room'

export const getRoomPasswordHashByRoomId: (roomId: string) => Promise<{ passwordHash: string } | null> = async (
    roomId: string,
) => {
    return RoomModel.findOne({ roomId }, '-_id passwordHash').lean()
}

export const getRoomByRoomId: (roomId: string) => Promise<IRoomBaseFromServer | null> = async (roomId: string) => {
    return RoomModel.findOne({ roomId }, '-_id roomId roomType roomInfo isPrivate').lean()
}

export const createRoom: (room: IPrivateRoom) => Promise<IRoomBaseFromServer | null> = async (room: IPrivateRoom) => {
    return RoomModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId() },
        { ...room },
        {
            upsert: true,
            new: true,
            projection: '-_id roomId roomType roomInfo isPrivate',
            lean: true,
        },
    )
}

export const deleteRoomById: (roomId: string) => Promise<void> = async (roomId: string) => {
    await RoomModel.deleteOne({ roomId })
}
