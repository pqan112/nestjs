import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EnvironmentModule } from './configs/env/env.module'
import { AuthModule } from './modules/auth/auth.module'
import { ProductsModule } from './modules/products/products.module'
import { UsersModule } from './modules/users/users.module'

@Module({
  imports: [EnvironmentModule, ProductsModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
