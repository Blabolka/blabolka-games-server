import { CorsOptions } from 'cors'

const corsOrigins: string | boolean =
    process.env.NODE_ENV === 'production' ? process.env.ALLOWED_CORS_ORIGINS || false : '*'

const corsOptions: CorsOptions = {
    origin: corsOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
}

export default corsOptions
