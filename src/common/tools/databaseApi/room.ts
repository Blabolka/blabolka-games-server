import RoomModel from '@models/Room'
import { RoomBase, RoomModelType } from '@entityTypes/room'

export const createRoom: (room: RoomBase) => Promise<RoomModelType> = async (room: RoomBase) => {
    return new RoomModel({ ...room }).save()
}
