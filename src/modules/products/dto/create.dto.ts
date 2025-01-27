import { IsNotEmpty, IsNumber, IsOptional, IsString, Validate } from 'class-validator'
import { TextLengthValidation } from 'src/validations/text-length.validation'

export default class CreateProductDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be characters' })
  @Validate(TextLengthValidation, [5, 225], { message: 'Name is too short or long' })
  name: string
  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber({}, { message: 'Price must be a number' })
  price: number
  @IsString()
  @IsOptional()
  description?: string = ''
}
