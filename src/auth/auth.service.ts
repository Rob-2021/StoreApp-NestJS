import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel:Model<User>,
    private readonly jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto) {
    try{
      const {password, ...userData} = createUserDto;
      const user = await this.userModel.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      return {
        user,
        token:this.getJwtToken({email: user.email})
      }
    } catch(error){
      this.handleExceptions(error);
    }
  }

  async login(loginUserDto: LoginUserDto){
    const {email, password} = loginUserDto;
    const user = await this.userModel
    .findOne({email})
    .select('email password')

    if(!user){
      throw new UnauthorizedException('Credenciales invalidas');
    }

    if(!bcrypt.compareSync(password, user.password)){
      throw new UnauthorizedException('Credenciales invalidas');
    }
    
    return {
      email: user.email,
      password: user.password,
      token: this.getJwtToken({email: user.email})
    }
  }

  //jwt
  private getJwtToken(payload: JwtPayload){
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Ususario existente en BD ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error);
    throw new InternalServerErrorException('Error al guardar el usuario');
  }
}
