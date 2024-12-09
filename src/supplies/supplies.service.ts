import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSupplyDto } from './dto/create-supply.dto';
import { UpdateSupplyDto } from './dto/update-supply.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Supply } from './entities/supply.entity';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class SuppliesService {

  constructor(
    @InjectModel(Supply.name)
    private readonly supplyModel: Model<Supply>
  ) { }

  async create(createSupplyDto: CreateSupplyDto) {
    //createSupplyDto.date = createSupplyDto.date.toDateString();
    try{
      const supply = await this.supplyModel.create(createSupplyDto);
      return supply;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return this.supplyModel.find();
  }

  async findOne(id: string) {
    let supply: Supply;
    //Buscar mongoID
    if (isValidObjectId(id)) {
      supply = await this.supplyModel.findById(id);
    }

    //Buscar por nombre
    // if (!supply) {
    //   supply = await this.supplyModel.findOne({ name: id.toLocaleLowerCase().trim() })
    // }

    if (!supply) {
      throw new NotFoundException(`Producto con id, name "${id}" no encontrado`);
    }
    return supply;
  }

  async update(id: string, updateSupplyDto: UpdateSupplyDto) {
    try {
      const supply = await this.findOne(id);
      // if (updateSupplyDto.date) {
      //   updateSupplyDto.amount = updateSupplyDto.amount.toString();
      //   await supply.updateOne(updateSupplyDto);
      //   return { ...supply.toJSON, ...updateSupplyDto };
      // }
      await supply.updateOne(updateSupplyDto);
      return { ...supply.toJSON, ...updateSupplyDto };
    } catch(error){
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const {deletedCount} = await this.supplyModel.deleteOne({ _id: id});
    if(deletedCount === 0){
      throw new BadRequestException(`Producto con id "${id}" no encontrado`);
    }
    return {message: `Producto con id "${id}" eliminado`};
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Producto existente en BD ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error);
    throw new InternalServerErrorException('Error al guardar el producto');
  }
}
