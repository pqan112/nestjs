import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { Request, Response } from 'express'
import { HttpMessage } from 'src/global/response.enum'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const logger = new Logger('Request')
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    const message = exception.message || HttpMessage.ERROR

    logger.error(`${statusCode} ${message} ${request.url}`)

    response.status(statusCode).json({
      data: null,
      success: false,
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      path: request.url
    })
  }
}
