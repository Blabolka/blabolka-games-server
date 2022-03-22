import { Router } from 'express'
import { getRoomById, postRoom } from '@controllers/common/rooms'

const router: Router = new Router()

router.get('/:id', getRoomById)
router.post('/', postRoom)

export default router
