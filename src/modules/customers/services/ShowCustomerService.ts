import AppError from '@shared/errors/appError'
import { getCustomRepository } from 'typeorm'
import Customer from '../typeorm/entities/Customer'
import CustomerRepository from '../typeorm/repositories/CustomersRepository'

interface IRequest {
  id: string
}

class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomerRepository)
    const customer = await customersRepository.findByID(id)

    if (!customer) {
      throw new AppError('Customer not found!')
    }

    return customer
  }
}

export default ShowCustomerService
