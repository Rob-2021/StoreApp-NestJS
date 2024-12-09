import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { isValidObjectId, Model } from 'mongoose';
import { error } from 'console';
import { PaginationDto } from 'src/common/pipes/dto/pagination.dto';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>
  ) { }

  async create(createProductDto: CreateProductDto) {
    createProductDto.name = createProductDto.name.toLocaleLowerCase();
    try {
      const product = await this.productModel.create(createProductDto);
      return product;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const {limit=10, offset=0} = paginationDto
    return this.productModel.find()
    .limit(limit)
    .skip(offset)
    .sort({
      name: 1
    })
    .select('-__v')
  }

  async findOne(id: string) {
    let product: Product;
    //Buscar mongoID
    if (isValidObjectId(id)) {
      product = await this.productModel.findById(id);
    }

    //Buscar por nombre
    if (!product) {
      product = await this.productModel.findOne({ name: id.toLocaleLowerCase().trim() })
    }

    if (!product) {
      throw new NotFoundException(`Producto con id, name "${id}" no encontrado`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.findOne(id);
      if (updateProductDto.name) {
        updateProductDto.name = updateProductDto.name.toLocaleLowerCase();
        await product.updateOne(updateProductDto);
        return { ...product.toJSON, ...updateProductDto };
      }
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    // const product = await this.findOne(id);
    // await product.deleteOne();
    const {deletedCount} = await this.productModel.deleteOne({ _id:id});
    if (deletedCount === 0){
      throw new BadRequestException(`Producto con id ${id} no encontrado`);
    }
    return {message: `Producto con id ${id} eliminado`};
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Producto existente en BD ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error);
    throw new InternalServerErrorException('Error al guardar el producto');
  }
}
