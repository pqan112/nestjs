import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './exceptions/http-exception.filter'
import { winstonLogger } from './logger/winston.logger'
import { LoggerMiddleware } from './middlewares/logger/logger.middleware'
import { formValidation } from './validations/form.validation'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger
  })
  app.use(new LoggerMiddleware().use)
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe(formValidation))
  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
