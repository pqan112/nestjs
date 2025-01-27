import { UnprocessableEntityException, ValidationError, ValidationPipeOptions } from '@nestjs/common'

export const formValidation: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  exceptionFactory: (validationErrors: ValidationError[] = []) => {
    return new UnprocessableEntityException(
      validationErrors.map((error) => ({
        field: error.property,
        error: error.constraints && Object.values(error.constraints)?.[0]
      }))
    )
  }
}
