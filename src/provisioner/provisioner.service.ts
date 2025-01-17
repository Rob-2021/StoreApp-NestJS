import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProvisionerDto } from './dto/create-provisioner.dto';
import { UpdateProvisionerDto } from './dto/update-provisioner.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Provisioner } from './entities/provisioner.entity';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDto } from 'src/common/pipes/dto/pagination.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class ProvisionerService {

  constructor(
    @InjectModel(Provisioner.name)
    private readonly provisionerModel: Model<Provisioner>
  ) { }

  async create(createProvisionerDto: CreateProvisionerDto, user:User) {
    createProvisionerDto.name = createProvisionerDto.name.toLocaleLowerCase();
    createProvisionerDto.user_id = user.id

    try {
      const provisioner = await this.provisionerModel.create(createProvisionerDto);
      return provisioner;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const {limit=10, offset=0} = paginationDto
    return this.provisionerModel.find()
    .limit(limit)
    .skip(offset)
    .sort({
      name: 1
    })
    .select('-__v')
  }

  async findOne(id: string) {
    let provisioner: Provisioner;
    //Buscar mongoID
    if (isValidObjectId(id)) {
      provisioner = await this.provisionerModel.findById(id);
    }

    //Buscar por nombre
    if (!provisioner) {
      provisioner = await this.provisionerModel.findOne({ name: id.toLocaleLowerCase().trim() })
    }

    if (!provisioner) {
      throw new NotFoundException(`Provisiones con id, name "${id}" no encontrado`);
    }
    return provisioner;
  }

  async update(id: string, updateProvisionerDto: UpdateProvisionerDto) {
    try {
      const provisioner = await this.findOne(id);
      if (updateProvisionerDto.name) {
        updateProvisionerDto.name = updateProvisionerDto.name.toLocaleLowerCase();
        await provisioner.updateOne(updateProvisionerDto);
        return { ...provisioner.toJSON, ...updateProvisionerDto };
      }
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const {deletedCount} = await this.provisionerModel.deleteOne({ _id:id });
    if(deletedCount === 0){
      throw new BadRequestException(`Provisioner con id "${id}" no encontrado`);
    }
    return {message: `Provisioner con id "${id}" eliminado correctamente`};
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Producto existente en BD ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error);
    throw new InternalServerErrorException('Error al guardar el producto');
  }
}
