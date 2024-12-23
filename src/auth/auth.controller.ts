import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ok } from 'assert';
import { RoleProtected } from './decorators/role-protected.decorator';
import { UserRoleGuard } from './guards/user-role.guard';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { ValidRoles } from './interfaces/valid-roles';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(){
    return {
      ok: true,
      message: 'Esta es una ruta privada'
    }
  }

  @Get('private2')
  @RoleProtected(ValidRoles.admin, ValidRoles.user)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(@GetUser() user:User){
    return{
      ok: true,
      user
      //message: 'Esta es una ruta privada con roles'
    }
  }


  @Get('private3')
  @Auth(ValidRoles.admin)
  privateRoute3(@GetUser() user:User){
    return{
      ok: true,
      user
      //message: 'Esta es una ruta privada con roles'
    }
  }
}
