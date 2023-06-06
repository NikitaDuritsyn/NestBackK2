import { Param, Post, Body, Controller, Get } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createSubCategoryDto } from './dto/create-sub-categories.dto';
import { SubCategory } from './sub-categories.model';

@ApiTags('Подкатегории')
@Controller('/api')
export class SubCategoriesController {
    constructor(private SubCategoriesService: SubCategoriesService) { }

    @ApiOperation({ summary: 'Создание подкатегорию' })
    @ApiResponse({ status: 200, type: SubCategory })
    @Post('/create_sub_category')
    createSubCategory(@Body() categotryDto: createSubCategoryDto) {
        return this.SubCategoriesService.createSubCategory(categotryDto)
    }

    @ApiOperation({ summary: 'Получить подкатегории' })
    @ApiResponse({ status: 200, type: [SubCategory] })
    @Get('/sub_categories')
    getSubCategory() {
        return this.SubCategoriesService.getSubCategory()
    }

    @ApiOperation({ summary: 'Получить подкатегории' })
    @ApiResponse({ status: 200, type: [SubCategory] })
    @Get('/sub_categories/:categoryId')
    getSubCategoryByCategoryId(@Param('categoryId') categoryId: number) {
        return this.SubCategoriesService.getSubCategoryByCategoryId(categoryId)
    }
}
