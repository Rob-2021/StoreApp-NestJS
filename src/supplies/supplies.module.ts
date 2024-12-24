import { Module } from '@nestjs/common';
import { SuppliesService } from './supplies.service';
import { SuppliesController } from './supplies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Supply, SupplySchema } from './entities/supply.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SuppliesController],
  providers: [SuppliesService],
  imports: [MongooseModule.forFeature([
    {
      name:Supply.name,
      schema:SupplySchema
    }
  ]),
  AuthModule
]
})
export class SuppliesModule {}
