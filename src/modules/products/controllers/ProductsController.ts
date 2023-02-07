import { Request, Response } from 'express'
import CreateProductService from '../services/CreateProductService'
import DeleteProductService from '../services/DeleteProductServece'
import ListProductService from '../services/ListProductService'
import ShowProductService from '../services/ShowProductService'
import UpdateProductService from '../services/UpdateProductsService'

export default class ProductsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listProducts = new ListProductService()

    const products = await listProducts.execute()

    return res.json(products)
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const showProduct = new ShowProductService()

    const product = await showProduct.execute({ id })

    return res.json(product)
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body

    const createProduct = new CreateProductService()

    const product = await createProduct.execute({
      name,
      price,
      quantity,
    })

    return res.json(product)
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body
    const { id } = req.params

    const updateProducts = new UpdateProductService()

    const product = await updateProducts.execute({
      id,
      name,
      price,
      quantity,
    })

    return res.json(product)
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params

    const deleteProducts = new DeleteProductService()

    await deleteProducts.execute({ id })

    return res.json([])
  }
}
