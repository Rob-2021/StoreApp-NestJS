import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { SuppliesModule } from './supplies/supplies.module';
import { ProvisionerModule } from './provisioner/provisioner.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/supermercado_db'),
    CommonModule,
    SuppliesModule,
    CategoriesModule,
    ProvisionerModule,
    AuthModule,],
  controllers: [],
})
export class AppModule { }
