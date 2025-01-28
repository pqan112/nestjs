import { IsEmail, IsNotEmpty } from 'class-validator'

export default class LoginUserDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email is invalid' })
  email: string

  @IsNotEmpty({ message: 'Password is required' })
  password: string
}
