import { Injectable } from '@nestjs/common';
import { SubCategory } from './sub-categories.model';
import { InjectModel } from '@nestjs/sequelize';
import { createSubCategoryDto } from './dto/create-sub-categories.dto';

@Injectable()
export class SubCategoriesService {
    constructor(
        @InjectModel(SubCategory) private SubCategoryRepository: typeof SubCategory,
    ) { }

    async createSubCategory(dto: createSubCategoryDto) {
        const subCategory = await this.SubCategoryRepository.create(dto)
        return subCategory
    }

    async getSubCategory() {
        const subCategory = await this.SubCategoryRepository.findAll()
        return subCategory
    }

    async getSubCategoryByCategoryId(categoryId: number) {
        const subCategories = await this.SubCategoryRepository.findAll({ where: { category_id: categoryId } })
        return subCategories
    }
}
