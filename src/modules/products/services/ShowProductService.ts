import AppError from '@shared/errors/appError'
import { getCustomRepository } from 'typeorm'
import Product from '../typeorm/entities/Product'
import { ProductRepository } from '../typeorm/repositories/ProductsRepository'

interface IRequest {
  id: string
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product | undefined> {
    const productsRepository = getCustomRepository(ProductRepository)
    const product = await productsRepository.findOne(id)

    if (!product) {
      throw new AppError('Product now found.')
    }
    return product
  }
}

export default ShowProductService
