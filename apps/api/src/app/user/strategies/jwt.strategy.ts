import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { config } from "apps/api/src/config";

import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IUser } from "../interfaces/user.interface";
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(config.tables.User) private userModel: Model<IUser>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const user = (
      await this.userModel.findOne({ _id: payload._id })
    ).toObject();
    delete user.password;
    return user;
  }
}
