import { Inject, Injectable } from '@nestjs/common'
import { REPOSITORIES } from 'src/constants'
import User from 'src/entities/user.entity'
import { Repository } from 'typeorm'
import CreateUserDto from './dto/create.dto'
import { comparePassword, hashPassword } from 'src/utils/hashing'

@Injectable()
export class UsersService {
  constructor(
    @Inject(REPOSITORIES.USER_REPOSITORY)
    private readonly userRepository: Repository<User>
  ) {}
  // create new user, findByEmail and validateUser
  async create(body: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(body)
    const hashedPassword = hashPassword(user.password)
    user.password = hashedPassword
    user.created_at = new Date()
    user.updated_at = new Date()
    return this.userRepository.save(user)
  }

  findByEmail(email: string) {
    const user = this.userRepository.findOneBy({ email })
    return user
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email)
    if (!user) return null
    const status = comparePassword(password, user.password)
    if (status) return user
    return null
  }

  async saveRefreshToken(refreshToken: string, userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId })
    const hashedRefreshToken = hashPassword(refreshToken)
    if (user) {
      user.refresh_token = hashedRefreshToken
      return this.userRepository.save(user)
    }
    return null
  }

  async verifyRefreshToken(refreshToken: string, userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId })
    if (user) {
      const status = comparePassword(refreshToken, user.refresh_token as string)

      if (status) {
        return user
      }
    }
    return null
  }
}
