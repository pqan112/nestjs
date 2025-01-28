import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import User from 'src/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  // login
  login(user: User) {
    const payload = { email: user.email, sub: user.id }
    const { password, ...userInfo } = user
    return {
      ...userInfo,
      access_token: this.jwtService.sign(payload)
    }
  }
}
