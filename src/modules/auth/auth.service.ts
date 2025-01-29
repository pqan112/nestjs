import { Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import User from 'src/entities/user.entity'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService
  ) {}
  // login
  async login(user: User) {
    const payload = { email: user.email, sub: user.id }
    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES
    })
    await this.userService.saveRefreshToken(refresh_token, user.id)
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token
    }
  }

  async verifyRefreshToken(refresh_token: string) {
    if (!refresh_token) {
      throw new NotFoundException('Refresh token is required')
    }
    const decoded = this.jwtService.decode(refresh_token) as { sub: number }

    if (decoded) {
      const user = await this.userService.verifyRefreshToken(refresh_token, decoded.sub)
      if (user) return user
    }
    return null
  }
}
