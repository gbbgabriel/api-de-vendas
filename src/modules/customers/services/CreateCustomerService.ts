import AppError from '@shared/errors/appError'
import { getCustomRepository } from 'typeorm'
import Customer from '../typeorm/entities/Customer'
import CustomerRepository from '../typeorm/repositories/CustomersRepository'

interface IRequest {
  name: string
  email: string
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomerRepository)
    const emailExistes = await customersRepository.findByEmail(email)

    if (emailExistes) {
      throw new AppError('Email addres already used.')
    }

    const customer = customersRepository.create({
      name,
      email,
    })

    await customersRepository.save(customer)

    return customer
  }
}

export default CreateCustomerService
