import { Inject, Injectable } from '@nestjs/common'
import { REPOSITORIES } from 'src/constants'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @Inject(REPOSITORIES.USER_REPOSITORY)
    private userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id })
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData)
    user.created_at = new Date()
    user.updated_at = new Date()
    return this.userRepository.save(user)
  }

  async updateById(id: number, userData: Partial<User>): Promise<User | null> {
    userData.updated_at = new Date()
    await this.userRepository.update(id, userData)
    return this.userRepository.findOneBy({ id })
  }

  async deleteById(id: number) {
    const user = await this.userRepository.findOneBy({ id })
    await this.userRepository.delete(id)
    return user
  }
}
