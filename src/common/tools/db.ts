import mongoose from 'mongoose'
import { Mongoose } from 'mongoose'

const connectUri: string = process.env.MONGO_CONNECT_URI || ''

const connectToMongoDatabase: () => Promise<Mongoose> = () => {
    return mongoose.connect(connectUri)
}

export default connectToMongoDatabase
