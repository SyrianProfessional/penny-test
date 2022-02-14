import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ required: true, default: 'ashraf@gmail.com' })
  email: string;

  @IsString()
  @MinLength(4, { message: 'Password is too short (4 characters min)' })
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
  @MinLength(4, { message: 'Password is too short (4 characters min)' })
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
  @MinLength(4, { message: 'Password is too short (4 characters min)' })
  @MaxLength(20, { message: 'Password is too long (20 characters max)' })
  @ApiProperty({ required: true, default: 'password@123' })
  password: string;
}

export class CheckResetPasswordTokenDto {
  @IsString()
  @ApiProperty({ required: true, default: '1234' })
  token: string;
}
