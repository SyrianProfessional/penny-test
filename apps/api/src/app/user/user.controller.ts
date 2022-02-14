import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { config } from '../../config';
import { QueryDto } from '../../dto/query.dto';
import { IResponse } from '../../interfaces/response.interface';
import { TranslationService } from '../translation/translation.service';
import {
  CheckResetPasswordTokenDto,
  ForgetPasswordDto,
  LoginUserDto,
  ResetPasswordDto,
  SignupUserDto,
} from './dto/user.dto';
import { UserGuard } from './guards/auth.guard';
import { LocalStrategieGuard } from './guards/local.guard';
import { UserService } from './services/user.service';

@ApiTags(config.tables.User)
@Controller('user')
export class UserController {
  constructor(
    private translateService: TranslationService,
    private userService: UserService
  ) {}

  @Post('/signup')
  async signUp(
    @Request() req,
    @Body(ValidationPipe) body: SignupUserDto
  ): Promise<IResponse> {
    return {
      data: await this.userService.signUp(req, body),
      message: await this.translateService.translate('signupSuccessfully'),
    };
  }

  @Post('/forget-password')
  async forgetPassword(
    @Request() req,
    @Body(ValidationPipe) body: ForgetPasswordDto
  ): Promise<IResponse> {
    return {
      data: await this.userService.forgetPassword(req, body),
      message: await this.translateService.translate('signupSuccessfully'),
    };
  }
  @Post('/reset-password')
  async resetPassword(
    @Request() req,
    @Body(ValidationPipe) body: ResetPasswordDto
  ): Promise<IResponse> {
    return {
      data: await this.userService.resetPassword(req, body),
      message: await this.translateService.translate('signupSuccessfully'),
    };
  }
  @Post('/check-reset-password')
  async checkResetPasswordTokenD(
    @Request() req,
    @Body(ValidationPipe) body: CheckResetPasswordTokenDto
  ): Promise<IResponse> {
    return {
      data: await this.userService.checkResetPasswordToken(req, body),
      message: await this.translateService.translate('signupSuccessfully'),
    };
  }

  @UseGuards(LocalStrategieGuard)
  @Post('/signin')
  async signIn(@Request() req, @Body() body: LoginUserDto): Promise<IResponse> {
    return {
      data: req.user,
      message: await this.translateService.translate('signinSuccessfully'),
    };
  }

  @ApiBearerAuth()
  @UseGuards(UserGuard)
  @Get('/me')
  async getMe(@Request() req): Promise<IResponse> {
    return {
      data: req.user,
      message: await this.translateService.translate('sessionIsValid'),
    };
  }

  @ApiBearerAuth()
  @UseGuards(UserGuard)
  @Get('/logout')
  async logout(@Request() req): Promise<IResponse> {
    return {
      data: await this.userService.logout(req),
      message: await this.translateService.translate('logoutSuccessfully'),
    };
  }

  @ApiBearerAuth()
  @UseGuards(UserGuard)
  @Get('/get-all-users')
  async getAllusers(
    @Request() req,
    @Query() query: QueryDto
  ): Promise<IResponse> {
    return {
      data: await this.userService.getAllUsers(req, query),
      message: await this.translateService.translate('signupSuccessfully'),
    };
  }
}
