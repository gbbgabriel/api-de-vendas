import redisCache from '@shared/cache/RedisCache'
import AppError from '@shared/errors/appError'
import { getCustomRepository } from 'typeorm'
import { ProductRepository } from '../typeorm/repositories/ProductsRepository'

interface IRequest {
  id: string
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository)
    const product = await productsRepository.findOne(id)

    if (!product) {
      throw new AppError('Product now found.')
    }

    //const redisCache = new RedisCache()

    await redisCache.invalidate('api-vendas-PRODUCTS_LIST')

    await productsRepository.remove(product)
  }
}

export default DeleteProductService
