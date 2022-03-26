import { Router } from 'express'
import { getRoomById, loginToRoom, postRoom } from '@controllers/common/rooms'

const router: Router = new Router()

router.get('/:id', getRoomById)
router.post('/', postRoom)
router.post('/:id/login', loginToRoom)

export default router
