import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './products.model';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product) private ProductRepository: typeof Product,
    ) { }

    async createProduct(dto: CreateProductDto) {
        const product = await this.ProductRepository.create(dto)
        return product
    }

    async getProducts() {
        const products = await this.ProductRepository.findAll()
        return products
    }

    async getProductsBySubCategory(subCategoryId: number) {
        const productsBySubCategory = await this.ProductRepository.findAll({ where: { sub_category_id: subCategoryId } })
        return productsBySubCategory
    }
}
