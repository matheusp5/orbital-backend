import express from 'express'
import { AuthRouter } from './routers/auth-router'
import { CategoriesRouter } from './routers/categories-router'
import { ProductsRouter } from './routers/products-router'
const app = express()

app.use(express.json())

app.use('/api/auth', AuthRouter)
app.use('/api/products', ProductsRouter)
app.use('/api/categories', CategoriesRouter)

export { app }
