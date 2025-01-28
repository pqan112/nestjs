import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { formValidation } from './validations/form.validation'
import 'dotenv/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe(formValidation))
  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
