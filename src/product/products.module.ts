import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './products.model';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    SequelizeModule.forFeature([Product])
  ],
  exports: [
    ProductService
  ]
})
export class ProductModule { }
