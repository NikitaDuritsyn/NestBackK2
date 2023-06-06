import { Module } from '@nestjs/common';
import { SubCategoriesController } from './sub-categories.controller';
import { SubCategoriesService } from './sub-categories.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubCategory } from './sub-categories.model';

@Module({
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService],
  imports: [
    SequelizeModule.forFeature([SubCategory]),
  ],
  exports: [
    SubCategoriesService
  ]
})
export class SubCategoriesModule { }
