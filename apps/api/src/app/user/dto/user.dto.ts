import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, MaxLength, MinLength, IsEmail } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ required: true, default: 'ashraf@gmail.com' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password is too short (8 characters min)' })
  @MaxLength(20, { message: 'Password is too long (20 characters max)' })
  @ApiProperty({ required: true, default: 'password@123' })
  password: string;
}

export class SignupUserDto {
  @IsString()
  @ApiProperty({ required: true, default: 'ashraf' })
  firstname: string;

  @IsString()
  @ApiProperty({ required: true, default: 'zidane' })
  lastname: string;

  @IsString()
  @MinLength(4)
  @IsEmail()
  @ApiProperty({ required: true, default: 'ashraf@gmail.com' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password is too short (8 characters min)' })
  @MaxLength(20, { message: 'Password is too long (20 characters max)' })
  @ApiProperty({ required: true, default: 'password@123' })
  password: string;
}

export class ForgetPasswordDto {
  @IsString()
  @MinLength(4)
  @IsEmail()
  @ApiProperty({ required: true, default: 'ashraf@gmail.com' })
  email: string;
}
export class ResetPasswordDto {
  @IsString()
  @ApiProperty({ required: true, default: '1234' })
  token: string;

  @IsString()
  @MinLength(8, { message: 'Password is too short (8 characters min)' })
  @MaxLength(20, { message: 'Password is too long (20 characters max)' })
  @ApiProperty({ required: true, default: 'password@123' })
  password: string;
}
