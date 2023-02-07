import { Router, Request, Response } from 'express'
import productsRouter from '@modules/products/routes/products.routes'
import usersRouter from '@modules/users/routes/users.routes'
import profileRouter from '@modules/users/routes/profile.routes'
import sessionsRouter from '@modules/users/routes/sessions.routes'
import passwordRouter from '@modules/users/routes/password.routes'
import customersRouter from '@modules/customers/routes/customers.routes'
import ordersRouter from '@modules/orders/routes/orders.routes'

const router = Router()

router.use('/products', productsRouter)
router.use('/users', usersRouter)
router.use('/sessions', sessionsRouter)
router.use('/password', passwordRouter)
router.use('/profile', profileRouter)
router.use('/customers', customersRouter)
router.use('/orders', ordersRouter)
router.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'Hello Dev!' })
})

export default router
