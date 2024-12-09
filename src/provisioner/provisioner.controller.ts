import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProvisionerService } from './provisioner.service';
import { CreateProvisionerDto } from './dto/create-provisioner.dto';
import { UpdateProvisionerDto } from './dto/update-provisioner.dto';

@Controller('provisioner')
export class ProvisionerController {
  constructor(private readonly provisionerService: ProvisionerService) {}

  @Post()
  create(@Body() createProvisionerDto: CreateProvisionerDto) {
    return this.provisionerService.create(createProvisionerDto);
  }

  @Get()
  findAll() {
    return this.provisionerService.findAll();
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
