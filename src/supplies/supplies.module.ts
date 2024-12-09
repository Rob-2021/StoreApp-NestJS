import { Module } from '@nestjs/common';
import { SuppliesService } from './supplies.service';
import { SuppliesController } from './supplies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Supply, SupplySchema } from './entities/supply.entity';

@Module({
  controllers: [SuppliesController],
  providers: [SuppliesService],
  imports: [MongooseModule.forFeature([
    {
      name:Supply.name,
      schema:SupplySchema
    }
  ])]
})
export class SuppliesModule {}
