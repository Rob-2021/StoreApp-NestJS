import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel:Model<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    try{
      const {password, ...userData} = createUserDto;
      const user = await this.userModel.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      return user;
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
      password: user.password
    }
  }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Ususario existente en BD ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error);
    throw new InternalServerErrorException('Error al guardar el usuario');
  }
}
