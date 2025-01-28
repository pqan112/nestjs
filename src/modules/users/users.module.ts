import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { userProviders } from './users.provider'
import { DatabaseModule } from 'src/configs/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...userProviders, UsersService],
  exports: [UsersService]
})
export class UsersModule {}
