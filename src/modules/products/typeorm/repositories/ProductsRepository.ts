import { EntityRepository, Repository, In } from 'typeorm'
import Product from '../entities/Product'

interface IFindProducts {
  id: string
}
@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.findOne({
      where: {
        name,
      },
    })

    return product
  }

  public async findAllByIDs( products: IFindProducts[] ): Promise<Product[]> {
    const productsIDs = products.map(product => product.id)

    const existisProducts = await this.find({
      where: {
        id: In(productsIDs),
      }
    })
    return existisProducts
  }
}
