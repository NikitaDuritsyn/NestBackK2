import { Injectable } from '@nestjs/common';
import { createCategoryDto } from './dto/create-category.dto';
import { Category } from './categories.model';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from 'src/product/products.model';
import { SubCategory } from 'src/sub-categories/sub-categories.model';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Category) private CategoryRepository: typeof Category) { }

    async createCategory(dto: createCategoryDto) {
        const category = await this.CategoryRepository.create(dto)
        return category
    }

    async getCategories() {
        const categories = await this.CategoryRepository.findAll()
        return categories
    }

    async getCategoriesSubsProducts(): Promise<any> {
        const categoriesSubsProducts = await this.CategoryRepository.findAll({
            include: [
                {
                    model: SubCategory,
                    attributes: ['id', 'title'],
                },
            ],
            attributes: ['id', 'title'],
        });

        const dictionary = {};

        for (const item of categoriesSubsProducts) {
            dictionary[item.title] = (item.SubCategory as any).map((subCategory: { title: any; }) => subCategory.title);
        }
        return dictionary;
    }

    async getProductsByCategory(category_id: number) {
        const categories = await this.CategoryRepository.findAll({
            where: { id: category_id },
            include: [
                {
                    model: SubCategory,
                    include: [
                        {
                            model: Product,
                            attributes: ['id', 'title', 'quantity', 'purchase_price', 'best_before_date', 'date'],
                        },
                    ],
                    attributes: ['id'],
                },
            ],
            attributes: ['id'],
        });

        let products = [];
        categories.forEach(category => {
            category.SubCategory?.forEach((subCategory: { Product: any[]; }) => {
                subCategory.Product?.forEach((product: any) => {
                    products.push(product);
                });
            });
        });

        return products;
    }

}
