import RoomModel from '@models/Room'
import { IRoomBase, IRoomModel } from '@entityTypes/room'

export const getRoomByRoomId: (roomId: string) => Promise<IRoomModel | null> = async (roomId: string) => {
    return RoomModel.findOne({ roomId })
}

export const createRoom: (room: IRoomBase) => Promise<IRoomModel> = async (room: IRoomBase) => {
    return RoomModel.create({ ...room })
}
