import { IsNumber, IsOptional, IsString } from 'class-validator'

export default class CreateProductDto {
  @IsString({ message: 'Name is required' })
  name: string
  @IsNumber({}, { message: 'Price must be a number' })
  price: number
  @IsString()
  @IsOptional()
  description?: string
}
