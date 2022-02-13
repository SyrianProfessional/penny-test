import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { config } from 'apps/api/src/config';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { TranslationService } from '../../translation/translation.service';
import {
  ForgetPasswordDto,
  ResetPasswordDto,
  SignupUserDto,
} from '../dto/user.dto';
import { IUser } from '../interfaces/user.interface';
import { v4 as uuid4 } from 'uuid';

const { JWT_EXPIRES_IN } = process.env;

@Injectable()
export class UserService {
  constructor(
    @InjectModel(config.tables.User) private userModel: Model<IUser>,
    private jwtService: JwtService,
    private translateService: TranslationService
  ) {}

  async signUp(req: Request, userBody: SignupUserDto): Promise<any> {
    const userAlreadyExists = await this.translateService.translate(
      'userAlreadyExists'
    );

    const { email, password } = userBody;

    const existUser = await this.userModel.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existUser) throw new ConflictException(userAlreadyExists);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: IUser = new this.userModel({
      ...userBody,
      password: hashedPassword,
    });

    const token = this.generateToken(user);
    user.token = token;
    user.loggedInAt = new Date();

    await user.save();

    return {
      user: this.returnUser(user),
      token,
    };
  }
  async forgetPassword(
    req: Request,
    { email }: ForgetPasswordDto
  ): Promise<any> {
    const userNotFound = await this.translateService.translate('userNotFound');

    const existUser = await this.userModel.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!existUser) throw new ConflictException(userNotFound);

    // const resetPasswordToken = uuid4();
    const resetPasswordToken = '1234';
    const resetPasswordExpires = new Date();

    // here send to email to reset the password by the code but here i put it as 1234 :)

    resetPasswordExpires.setHours(resetPasswordExpires.getHours() + 1);

    await this.userModel.findOneAndUpdate(
      { _id: existUser._id },
      { resetPasswordToken, resetPasswordExpires },
      { new: true }
    );

    return true;
  }

  async resetPassword(
    req: Request,
    { token, password }: ResetPasswordDto
  ): Promise<any> {
    const userNotFound = await this.translateService.translate('userNotFound');
    const resetPasswordTokenIsExpired = await this.translateService.translate(
      'resetPasswordTokenIsExpired'
    );

    let existUser = await this.userModel.findOne({
      resetPasswordToken: token,
    });

    if (!existUser) throw new ConflictException(userNotFound);

    const now = new Date();
    const expireDate = new Date(existUser.resetPasswordExpires);

    if (now.getTime() > expireDate.getTime()) {
      throw new ConflictException(resetPasswordTokenIsExpired);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userToken = this.generateToken(existUser);

    existUser = await this.userModel.findOneAndUpdate(
      { _id: existUser._id },
      {
        resetPasswordToken: '',
        resetPasswordExpires: undefined,
        password: hashedPassword,
        token: userToken,
      },
      { new: true }
    );

    return this.returnUser(existUser);
  }

  async logout(req: Request | any): Promise<any> {
    await this.userModel.findOneAndUpdate(
      { _id: req.user._id },
      { token: '' },
      { new: true }
    );
    return true;
  }

  async signIn(req, email: string, pass: string): Promise<any> {
    const invalidCredentials = await this.translateService.translate(
      'invalidCredentials'
    );

    let user = await this.userModel.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      throw new UnauthorizedException(invalidCredentials);
    }
    const valid = await bcrypt.compare(pass, user.password);

    if (valid) {
      const token = this.generateToken(user);
      user = await this.userModel.findOneAndUpdate(
        { _id: user._id },
        { token, loggedInAt: new Date() },
        { new: true }
      );

      req.user = this.returnUser(user);
      return this.returnUser(user);
    }
    return null;
  }

  async checkToken(req: Request | any): Promise<boolean> {
    const sessionExpired = await this.translateService.translate(
      'sessionExpired'
    );
    const youAreNotAuthuraized = await this.translateService.translate(
      'youAreNotAuthuraized'
    );

    const userNotFound = await this.translateService.translate('userNotFound');

    const { authorization } = req.headers;
    const token = authorization ? authorization.replace('Bearer ', '') : '';

    if (!token) throw new UnauthorizedException(youAreNotAuthuraized);

    const decoed: any = this.jwtService.decode(token);
    if (!decoed) throw new UnauthorizedException(youAreNotAuthuraized);

    let existUser = await this.userModel.findOne({
      _id: decoed._id,
      token,
    });

    if (!existUser) throw new UnauthorizedException(userNotFound);

    const loggedInAt = new Date(existUser.loggedInAt);
    const now = new Date();
    loggedInAt.setHours(
      loggedInAt.getHours() + (JWT_EXPIRES_IN ? parseInt(JWT_EXPIRES_IN) : 8)
    );
    if (now > loggedInAt) throw new UnauthorizedException(sessionExpired);

    existUser = await this.userModel.findOneAndUpdate(
      { _id: existUser._id },
      { loggedInAt: new Date() },
      { new: true }
    );

    req.user = this.returnUser(existUser);

    return true;
  }

  returnUser = (user: IUser) => {
    return {
      _id: user._id,
      fullName: `${user.firstname} ${user.lastname}`,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      token: user.token,
    };
  };

  generateToken(user: IUser) {
    return this.jwtService.sign({
      _id: user._id,
    });
  }
}
