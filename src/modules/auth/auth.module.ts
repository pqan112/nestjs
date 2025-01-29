import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from 'src/passports/jwt.strategy'
import { LocalStrategy } from 'src/passports/local.strategy'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy], // add strategies to providers
  imports: [
    UsersModule,
    PassportModule, // use passport to login email password
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES } // thgian hết hạn
    })
  ]
})
export class AuthModule {}
