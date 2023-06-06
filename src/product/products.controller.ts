import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './products.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './products.model';
import { CreateProductDto } from './dto/create-product.dto';

@ApiTags('Категории')
@Controller('/api')
export class ProductController {
    constructor(private ProductService: ProductService) { }

    @ApiOperation({ summary: 'Создание продукта' })
    @ApiResponse({ status: 200, type: Product })
    @Post('/create_product')
    create(@Body() dto: CreateProductDto) {
        return this.ProductService.createProduct(dto)
    }

    @ApiOperation({ summary: 'Получить продукты' })
    @ApiResponse({ status: 200, type: [Product] })
    @Get('/products')
    getProducts() {
        return this.ProductService.getProducts()
    }

    @ApiOperation({ summary: 'Получить по подкатегории продукты' })
    @ApiResponse({ status: 200, type: [Product] })
    @Get('/products_by_sub_category/:subCategoryId')
    getProductsBySubCategory(@Param('subCategoryId') subCategoryId: number) {
        return this.ProductService.getProductsBySubCategory(subCategoryId)
    }
}
