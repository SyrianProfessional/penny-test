import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';
// import { AuthAdminService } from "../services/auth-admin.service";

@Injectable({})
export class UserGuard implements CanActivate {
    constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    return await this.userService.checkToken(request);

  }
}
