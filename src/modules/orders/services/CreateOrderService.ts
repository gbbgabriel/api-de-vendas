import CustomerRepository from '@modules/customers/typeorm/repositories/CustomersRepository'
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository'
import AppError from '@shared/errors/appError'
import { getCustomRepository } from 'typeorm'
import Order from '../typeorm/entities/Order'
import OrdersRepository from '../typeorm/repositories/OrdersRepository'

interface IProducts {
  id: string
  quantity: number
}
interface IRequest {
  customer_id: string
  products: IProducts[]
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository)
    const customersRepository = getCustomRepository(CustomerRepository)
    const productsRepository = getCustomRepository(ProductRepository)

    const customerExistes = await customersRepository.findByID(customer_id)

    if (!customerExistes) {
      throw new AppError('Could not find any customer with given id.')
    }

    const existisProducts = await productsRepository.findAllByIDs(products)

    if (!existisProducts.length) {
      throw new AppError('Could not find any products with given id.')
    }

    const existisProductsIds = existisProducts.map(product => product.id)

    const checkInexistentProducts = products.filter(
      product => !existisProductsIds.includes(product.id),
    )

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}.`,
      )
    }

    const quantityAvailable = products.filter(
      product =>
        existisProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    )

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}.`,
      )
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existisProducts.filter(p => p.id === product.id)[0].price,
    }))

    const order = await ordersRepository.createOrder({
      customer: customerExistes,
      products: serializedProducts,
    })

    const { order_products } = order

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existisProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }))

    await productsRepository.save(updatedProductQuantity)

    return order
  }
}

export default CreateOrderService
