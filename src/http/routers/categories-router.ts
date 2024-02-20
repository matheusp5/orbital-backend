import { Router } from 'express'
import { CategoriesController } from '../controllers/categories-controller'
const router = Router()

const controller = new CategoriesController()

router.get('/', controller.findAll)
router.get('/name/:name', controller.findAll)
router.get('/slug/:slug', controller.findBySlug)
router.get('/id/:id', controller.findById)
router.post('/', controller.create)

export { router as CategoriesRouter }
