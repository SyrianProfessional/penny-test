import {
    ConflictException,
    Injectable,
    UnauthorizedException,
  } from "@nestjs/common";
  import { JwtService } from "@nestjs/jwt";
  import { InjectModel } from "@nestjs/mongoose";
  import * as bcrypt from "bcrypt";
//   import { config } from "config";
//   import { Model } from "mongoose";
//   import { TranslationService } from "src/core/language/translate.service";
//   import { UserDto } from "../dto/user.dto";
//   import { SessionT } from "../interfaces/session.interface";
//   import { UserT } from "../interfaces/user.interface";
  
  @Injectable()
  export class AuthAdminService {
    // constructor(
    //   private jwtService: JwtService,
    //   @InjectModel(config.mongo.tables.User) private userModel: Model<UserT>,
    //   @InjectModel(config.mongo.tables.Session)
    //   private sessionModel: Model<SessionT>,
    //   private translateService: TranslationService
    // ) {}
  
    // async checkUserGuard(request: Request | any): Promise<boolean> {
    //   // const request = context.switchToHttp().getRequest();
  
    //   const noPermissionMessage = await this.translateService.translate(
    //     request.lang,
    //     "user",
    //     "noPermission"
    //   );
    //   const youAreNotAuthuraized = await this.translateService.translate(
    //     request.lang,
    //     "user",
    //     "youAreNotAuthuraized"
    //   );
    //   const sessionIsNotValid = await this.translateService.translate(
    //     request.lang,
    //     "user",
    //     "sessionIsNotValid"
    //   );
    //   const userNotActive = await this.translateService.translate(
    //     request.lang,
    //     "user",
    //     "userNotActive"
    //   );
    //   const userIsBlocked = await this.translateService.translate(
    //     request.lang,
    //     "user",
    //     "userIsBlocked"
    //   );
    //   const userNotFound = await this.translateService.translate(
    //     request.lang,
    //     "user",
    //     "userNotFound"
    //   );
  
    //   const { authorization } = request.headers;
    //   const token = authorization ? authorization.replace("Bearer ", "") : "";
  
    //   if (!token) throw new UnauthorizedException(youAreNotAuthuraized);
  
    //   const decoed: any = this.jwtService.decode(token);
    //   if (!decoed) throw new UnauthorizedException(youAreNotAuthuraized);
  
    //   const existUser = await this.userModel.findOne({
    //     _id: decoed._id,
    //   });
  
    //   if (!existUser) throw new UnauthorizedException(userNotFound);
    //   if (!existUser.isActive) throw new UnauthorizedException(userNotActive);
    //   if (existUser.isDeleted) throw new UnauthorizedException(userIsBlocked);
  
    //   const existSession = await this.sessionModel.findOne({
    //     token,
    //     deviceid: request.deviceid,
    //     devicetype: request.devicetype,
    //     user: existUser._id,
    //   });
  
    //   if (!existSession) throw new UnauthorizedException(userNotFound);
  
    //   const now = new Date();
  
    //   const expierdDate = new Date(existSession.latestSeen);
    //   expierdDate.setDate(now.getDate() + config.sessionExpierdDays);
  
    //   // if (now.getMonth() == 11) {
    //   //   current = new Date(now.getFullYear() + 1, 0, 1);
    //   // } else {
    //   //   current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    //   // }
  
    //   if (now > expierdDate) {
    //     throw new UnauthorizedException(sessionIsNotValid);
    //   } else {
    //     await this.sessionModel.findOneAndUpdate(
    //       { _id: existSession._id },
    //       { latestSeen: new Date() },
    //       { new: true }
    //     );
    //   }
  
    //   let _user = existUser.toObject();
  
    //   delete _user.password;
  
    //   request.user = _user;
    //   request.session = existSession;
  
    //   return true;
    // }
    // async checkAdminGuard(request: Request | any): Promise<boolean> {
    //   // const request = context.switchToHttp().getRequest();
  
    //   const noPermissionMessage = await this.translateService.translate(
    //     request.lang,
    //     "user",
    //     "noPermission"
    //   );
    //   const youAreNotAuthuraized = await this.translateService.translate(
    //     request.lang,
    //     "user",
    //     "youAreNotAuthuraized"
    //   );
    //   const sessionIsNotValid = await this.translateService.translate(
    //     request.lang,
    //     "user",
    //     "sessionIsNotValid"
    //   );
    //   const userNotActive = await this.translateService.translate(
    //     request.lang,
    //     "user",
    //     "userNotActive"
    //   );
    //   const userIsBlocked = await this.translateService.translate(
    //     request.lang,
    //     "user",
    //     "userIsBlocked"
    //   );
    //   const userNotFound = await this.translateService.translate(
    //     request.lang,
    //     "user",
    //     "userNotFound"
    //   );
  
    //   const { authorization } = request.headers;
    //   const token = authorization ? authorization.replace("Bearer ", "") : "";
  
    //   if (!token) throw new UnauthorizedException(youAreNotAuthuraized);
  
    //   const decoed: any = this.jwtService.decode(token);
    //   if (!decoed) throw new UnauthorizedException(youAreNotAuthuraized);
  
    //   const existUser = await this.userModel.findOne({
    //     _id: decoed._id,
    //   });
  
    //   if (!existUser) throw new UnauthorizedException(userNotFound);
    //   if (!existUser.isActive) throw new UnauthorizedException(userNotActive);
    //   if (existUser.isDeleted) throw new UnauthorizedException(userIsBlocked);
    //   if (existUser.role !== "admin")
    //     throw new UnauthorizedException(noPermissionMessage);
  
    //   const existSession = await this.sessionModel.findOne({
    //     token,
    //     deviceid: request.deviceid,
    //     devicetype: request.devicetype,
    //     user: existUser._id,
    //   });
  
    //   if (!existSession) throw new UnauthorizedException(userNotFound);
  
    //   const now = new Date();
  
    //   const expierdDate = new Date(existSession.latestSeen);
    //   expierdDate.setDate(now.getDate() + config.sessionExpierdDays);
  
    //   if (now > expierdDate) {
    //     throw new UnauthorizedException(sessionIsNotValid);
    //   } else {
    //     await this.sessionModel.findOneAndUpdate(
    //       { _id: existSession._id },
    //       { latestSeen: new Date() },
    //       { new: true }
    //     );
    //   }
  
    //   let _user = existUser.toObject();
  
    //   delete _user.password;
  
    //   request.user = _user;
    //   request.session = existSession;
  
    //   return true;
    // }
  
    // async checkUserLogOrNotGuard(request: Request | any): Promise<boolean> {
    //   // const request = context.switchToHttp().getRequest();
  
    //   const noPermissionMessage = await this.translateService.translate(
    //     request.lang,
    //     "user",
    //     "noPermission"
    //   );
    //   const youAreNotAuthuraized = await this.translateService.translate(
    //     request.lang,
    //     "user",
    //     "youAreNotAuthuraized"
    //   );
    //   const sessionIsNotValid = await this.translateService.translate(
    //     request.lang,
    //     "user",
    //     "sessionIsNotValid"
    //   );
    //   const userNotActive = await this.translateService.translate(
    //     request.lang,
    //     "user",
    //     "userNotActive"
    //   );
    //   const userIsBlocked = await this.translateService.translate(
    //     request.lang,
    //     "user",
    //     "userIsBlocked"
    //   );
    //   const userNotFound = await this.translateService.translate(
    //     request.lang,
    //     "user",
    //     "userNotFound"
    //   );
  
    //   const { authorization } = request.headers;
    //   const token = authorization ? authorization.replace("Bearer ", "") : "";
  
    //   if (!token) return true;
  
    //   const decoed: any = this.jwtService.decode(token);
    //   if (!decoed) return true;
  
    //   const existUser = await this.userModel.findOne({
    //     _id: decoed._id,
    //   });
  
    //   if (!existUser) throw new UnauthorizedException(userNotFound);
    //   if (!existUser.isActive) throw new UnauthorizedException(userNotActive);
    //   if (existUser.isDeleted) throw new UnauthorizedException(userIsBlocked);
  
    //   const existSession = await this.sessionModel.findOne({
    //     token,
    //     deviceid: request.deviceid,
    //     devicetype: request.devicetype,
    //     user: existUser._id,
    //   });
  
    //   if (!existSession) return true;
  
    //   const now = new Date();
  
    //   const expierdDate = new Date(existSession.latestSeen);
    //   expierdDate.setDate(now.getDate() + config.sessionExpierdDays);
  
    //   if (now > expierdDate) {
    //     return true;
    //   } else {
    //     await this.sessionModel.findOneAndUpdate(
    //       { _id: existSession._id },
    //       { latestSeen: new Date() },
    //       { new: true }
    //     );
    //   }
  
    //   let _user = existUser.toObject();
  
    //   delete _user.password;
  
    //   request.user = _user;
    //   request.session = existSession;
  
    //   return true;
    // }
  
    // async checkUserLogOrNotGuardForSocket(request: any): Promise<any> {
    //   // const request = context.switchToHttp().getRequest();
  
    //   const noPermissionMessage = await this.translateService.translate(
    //     request.lang,
    //     "user",
    //     "noPermission"
    //   );
    //   const youAreNotAuthuraized = await this.translateService.translate(
    //     request.lang,
    //     "user",
    //     "youAreNotAuthuraized"
    //   );
    //   const sessionIsNotValid = await this.translateService.translate(
    //     request.lang,
    //     "user",
    //     "sessionIsNotValid"
    //   );
    //   const userNotActive = await this.translateService.translate(
    //     request.lang,
    //     "user",
    //     "userNotActive"
    //   );
    //   const userIsBlocked = await this.translateService.translate(
    //     request.lang,
    //     "user",
    //     "userIsBlocked"
    //   );
    //   const userNotFound = await this.translateService.translate(
    //     request.lang,
    //     "user",
    //     "userNotFound"
    //   );
  
    //   const token = request.token;
  
    //   if (!token) return true;
  
    //   const decoed: any = this.jwtService.decode(token);
  
    //   if (!decoed) return true;
  
    //   const existUser = await this.userModel.findOne({
    //     _id: decoed._id,
    //   });
  
    //   if (!existUser) return false;
    //   if (!existUser.isActive) return false;
    //   if (existUser.isDeleted) return false;
  
    //   let existSession = await this.sessionModel.findOne({
    //     token,
    //     deviceid: request.deviceid,
    //     devicetype: request.devicetype,
    //     user: existUser._id,
    //   }) as SessionT;
  
    //   if (!existSession) return false;
  
    //   const now = new Date();
  
    //   const expierdDate = new Date(existSession.latestSeen);
    //   expierdDate.setDate(now.getDate() + config.sessionExpierdDays);
  
    //   if (now > expierdDate) {
    //     return false;
    //   } else {
    //     existSession =  await this.sessionModel.findOneAndUpdate(
    //       { _id: existSession._id },
    //       { latestSeen: new Date(), isOnline : true },
    //       { new: true }
    //     ) ;
    //   }
  
    //   let _user = existUser.toObject();
  
    //   delete _user.password;
  
    //   request.user = _user;
    //   request.session = existSession;
  
    //   return {
    //     user: _user,
    //     session: existSession,
    //   };
    // }
  }
  