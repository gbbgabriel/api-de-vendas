import AppError from '@shared/errors/appError'
import { getCustomRepository } from 'typeorm'
import User from '../typeorm/entities/User'
import UsersRepository from '../typeorm/repositories/UserRepository'

interface IRequest {
  user_id: string
}
class ShowProfileService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)
    const user = await usersRepository.findByID(user_id)

    if (!user) {
      throw new AppError('user not found!')
    }

    return user
  }
}

export default ShowProfileService
