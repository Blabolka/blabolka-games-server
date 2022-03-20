import { Router } from 'express'
import { getRoomById } from '@controllers/common/rooms'

const router: Router = new Router()

router.get('/:id', getRoomById)

export default router
