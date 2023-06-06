import { Param, Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { Category } from './categories.model';
import { createCategoryDto } from './dto/create-category.dto';
import { Product } from 'src/product/products.model';

@ApiTags('Категории')
@Controller('/api')
export class CategoriesController {

    constructor(private CategoriesService: CategoriesService) { }

    @ApiOperation({ summary: 'Создание категорию' })
    @ApiResponse({ status: 200, type: Category })
    @Post('/create_category')
    create(@Body() categotryDto: createCategoryDto) {
        return this.CategoriesService.createCategory(categotryDto)
    }

    @ApiOperation({ summary: 'Получить категории' })
    @ApiResponse({ status: 200, type: [Category] })
    @Get('/categories')
    getCategories() {
        return this.CategoriesService.getCategories()
    }

    @ApiOperation({ summary: 'Получить категории' })
    @ApiResponse({ status: 200, type: [Category] })
    @Get('/categories_subs')
    getCategoriesSubsProducts() {
        return this.CategoriesService.getCategoriesSubsProducts()
    }

    @ApiOperation({ summary: 'Получить по категории продукты' })
    @ApiResponse({ status: 200, type: [Product] })
    @Get('/products_by_category/:categoryId')
    getProductsByCategory(@Param('categoryId') categoryId: number) {
        return this.CategoriesService.getProductsByCategory(categoryId)
    }
}
