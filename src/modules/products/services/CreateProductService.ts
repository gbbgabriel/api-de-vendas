import redisCache from '@shared/cache/RedisCache'
import AppError from '@shared/errors/appError'
import { getCustomRepository } from 'typeorm'
import Product from '../typeorm/entities/Product'
import { ProductRepository } from '../typeorm/repositories/ProductsRepository'

interface IRequest {
  name: string
  price: number
  quantity: number
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository)

    const productExistes = await productsRepository.findByName(name)

    if (productExistes) {
      throw new AppError('There is already one product with this name')
    }

    //const redisCache = new RedisCache()

    const product = productsRepository.create({
      name,
      price,
      quantity,
    })

    await redisCache.invalidate('api-vendas-PRODUCTS_LIST')

    await productsRepository.save(product)

    return product
  }
}

export default CreateProductService
