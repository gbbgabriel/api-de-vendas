import AppError from '@shared/errors/appError'
import { getCustomRepository } from 'typeorm'
import CustomerRepository from '../typeorm/repositories/CustomersRepository'

interface IRequest {
  id: string
}

class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customersRepository = getCustomRepository(CustomerRepository)
    const customer = await customersRepository.findByID(id)

    if (!customer) {
      throw new AppError('Customer not found!')
    }

    await customersRepository.remove(customer)
  }
}

export default DeleteCustomerService
