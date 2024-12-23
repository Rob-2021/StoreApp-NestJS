import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { META_ROLES } from "../decorators/role-protected.decorator";
import { User } from "../entities/user.entity";

@Injectable()
export class UserRoleGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector
    ) { }

    canActivate(
        context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const ValidRoles:string[]=this.reflector.get(META_ROLES, context.getHandler());
        if (!ValidRoles) {
            return true;
        }

        if(ValidRoles.length===0){
            return true;
        }

        const request = context.switchToHttp().getRequest();

        const user = request.user as User;
        
        if(!user){
            throw new BadRequestException('User not found (request)');
        }

        for(const role of user.role){
            if(ValidRoles.includes(role)){
                return true;
            }
        }
        throw new ForbiddenException(
            `User ${user.fullName} need valid role: [${ValidRoles}]`
        )
    }
}