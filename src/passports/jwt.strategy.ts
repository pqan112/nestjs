import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import User from 'src/entities/user.entity'
import { UsersService } from 'src/modules/users/users.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY || ''
    })
  }

  async validate(payload: Pick<User, 'email'>) {
    const user = await this.userService.findByEmail(payload.email)
    return user // controller receive user data via @Req() req and jwtGuard
  }
}
