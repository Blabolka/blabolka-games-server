import RoomModel from '@models/Room'
import { IRoomBase, IRoomModel } from '@entityTypes/room'

export const getRoomByRoomId: (roomId: string) => Promise<IRoomModel | null> = async (roomId: string) => {
    return RoomModel.findOne({ roomId })
}

export const createRoom: (room: IRoomBase) => Promise<IRoomModel> = async (room: IRoomBase) => {
    return RoomModel.create({ ...room })
}

export const deleteRoomById: (roomId: string) => Promise<void> = async (roomId: string) => {
    await RoomModel.deleteOne({ roomId })
}
