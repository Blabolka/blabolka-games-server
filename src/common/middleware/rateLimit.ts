import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit'

const limiter: RateLimitRequestHandler = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 300, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
})

export default limiter
