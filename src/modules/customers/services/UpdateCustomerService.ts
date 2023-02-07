import AppError from '@shared/errors/appError'
import { getCustomRepository } from 'typeorm'
import CustomerRepository from '../typeorm/repositories/CustomersRepository'
import Customer from '../typeorm/entities/Customer'

interface IRequest {
  id: string
  name: string
  email: string
}

class UpdateCustumerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomerRepository)
    const customer = await customersRepository.findByID(id)

    if (!customer) {
      throw new AppError('Customer not found!')
    }

    const customerExists = await customersRepository.findByEmail(email)

    if (customerExists && email !== customer.email) {
      throw new AppError('There is already one customer with this email.')
    }

    customer.name = name
    customer.email = email

    await customersRepository.save(customer)
    return customer
  }
}

export default UpdateCustumerService
