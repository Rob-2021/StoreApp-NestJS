import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ProvisionerService } from './provisioner.service';
import { CreateProvisionerDto } from './dto/create-provisioner.dto';
import { UpdateProvisionerDto } from './dto/update-provisioner.dto';
import { PaginationDto } from 'src/common/pipes/dto/pagination.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('provisioner')
export class ProvisionerController {
  constructor(private readonly provisionerService: ProvisionerService) {}

  @Post()
  @Auth(ValidRoles.admin)
  @HttpCode(HttpStatus.OK)
  create(
    @Body() createProvisionerDto: CreateProvisionerDto,
    @GetUser() user:User) {
    return this.provisionerService.create(createProvisionerDto, user);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.provisionerService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.provisionerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProvisionerDto: UpdateProvisionerDto) {
    return this.provisionerService.update(id, updateProvisionerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.provisionerService.remove(id);
  }
}
