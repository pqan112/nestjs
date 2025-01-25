import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.entity'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.userService.findById(+id)
  }

  @Post()
  createUser(@Body() body: Partial<User>) {
    return this.userService.createUser(body)
  }

  @Patch('/:id')
  updateById(@Param('id') id: string, @Body() body: Partial<User>) {
    return this.userService.updateById(+id, body)
  }

  @Delete('/:id')
  deleteById(@Param('id') id: string) {
    return this.userService.deleteById(+id)
  }
}
