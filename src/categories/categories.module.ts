import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './categories.model';
import { SubCategoriesModule } from 'src/sub-categories/sub-categories.module';
import { ProductModule } from 'src/product/products.module';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [
    SequelizeModule.forFeature([Category]),
    SubCategoriesModule,
    ProductModule
  ]
})
export class CategoriesModule { }
