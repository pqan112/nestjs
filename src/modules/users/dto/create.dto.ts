import { IsEmail, IsNotEmpty } from 'class-validator'

export default class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email is invalid' })
  email: string

  @IsNotEmpty({ message: 'Password is required' })
  password: string
}
