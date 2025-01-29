import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Req, UseGuards } from '@nestjs/common'
import User from 'src/entities/user.entity'
import { LocalAuthGuard } from 'src/guards/local-auth.guard'
import CreateUserDto from '../users/dto/create.dto'
import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard'
import ResponseData from 'src/global/response-data'
import { HttpMessage } from 'src/global/response.enum'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @Post('/register')
  register(@Body() body: CreateUserDto) {
    return this.userService.create(body)
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: { user: User }) {
    const result = await this.authService.login(req.user)
    return new ResponseData({ data: result, statusCode: HttpStatus.OK, message: HttpMessage.SUCCESS })
  }

  @Post('/refreshToken')
  async refreshToken(@Body() { refresh_token }: { refresh_token: string }) {
    const user = await this.authService.verifyRefreshToken(refresh_token)
    if (!user) {
      throw new BadRequestException('Invalid refresh token')
    }
    if (user) {
      const result = await this.authService.login(user)
      return new ResponseData({ data: result, statusCode: HttpStatus.OK, message: HttpMessage.SUCCESS })
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getMyProfile(@Req() req: { user: User }) {
    const { password, ...userInfo } = req.user
    return new ResponseData({ data: userInfo, statusCode: HttpStatus.OK, message: HttpMessage.SUCCESS })
  }
}
