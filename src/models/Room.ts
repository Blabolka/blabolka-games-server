import { RoomModel } from '@entityTypes/room'
import { Schema, model, Model } from 'mongoose'

const schema: Schema = new Schema(
    {
        roomId: {
            type: String,
            required: true,
        },
    },
    {
        collection: 'rooms',
        versionKey: false,
    },
)

const RoomModel: Model<RoomModel> = model<RoomModel>('Room', schema)

export default RoomModel
