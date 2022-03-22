import { Schema, model, Model } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

import { RoomModelType, RoomTypesEnum } from '@entityTypes/room'

const schema: Schema = new Schema(
    {
        roomId: {
            type: String,
            default: uuidv4(),
        },
        roomType: {
            type: String,
            enum: Object.values(RoomTypesEnum).map((roomType: string) => roomType),
            required: true,
        },
        roomInfo: {
            type: Schema.Types.Mixed,
            required: true,
        },
        isPrivate: {
            type: Boolean,
            required: true,
        },
        password: {
            type: String,
            required: false,
        },
    },
    {
        collection: 'rooms',
        versionKey: false,
    },
)

const RoomModel: Model<RoomModelType> = model<RoomModelType>('Room', schema)

export default RoomModel
