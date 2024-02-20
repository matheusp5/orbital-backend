import { Router } from 'express'
import { AuthController } from '../controllers/auth-controller'
const router = Router()

const controller = new AuthController()

router.post('/login', controller.login)
router.post('/register', controller.register)
router.post('/decode', controller.decode)

export { router as AuthRouter }
