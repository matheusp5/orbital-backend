import { Router } from 'express'
import { ProductsController } from '../controllers/products-controller'
const router = Router()

const controller = new ProductsController()

router.get('/', controller.findAll)
router.get('/id/:id', controller.findById)
router.get('/slug/:slug', controller.findBySlug)
router.get('/name/:name', controller.findByName)
router.get('/category/id/:id', controller.findByCategoryId)
router.get('/category/name/:name', controller.findByCategoryName)
router.post('/', controller.create)

export { router as ProductsRouter }
