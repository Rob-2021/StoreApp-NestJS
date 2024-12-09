import { Module } from '@nestjs/common';
import { ProvisionerService } from './provisioner.service';
import { ProvisionerController } from './provisioner.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Provisioner, ProvisionerSchema } from './entities/provisioner.entity';

@Module({
  controllers: [ProvisionerController],
  providers: [ProvisionerService],
  imports: [MongooseModule.forFeature([
    {
      name:Provisioner.name,
      schema:ProvisionerSchema
    }
  ])]
})
export class ProvisionerModule {}
