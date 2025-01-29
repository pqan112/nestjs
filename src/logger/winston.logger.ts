import { utilities, WinstonModule } from 'nest-winston'
import * as winston from 'winston'

export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        utilities.format.nestLike('MyAppNè', {
          colors: true,
          prettyPrint: true,
          processId: true,
          appName: true
        })
      )
    }),
    new winston.transports.File({
      filename: 'application.log',
      format: winston.format.json()
    })
    // other transports...
  ]
})
