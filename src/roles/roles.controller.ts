import { Body, Controller, Get, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.model';
import { createRoleDto } from './dto/create-role.dto';

@ApiTags('Роли')
@Controller('/api')
export class RolesController {
    constructor(private rolesService: RolesService) { }

    @ApiOperation({summary: 'Создать услугу пользователя'})
    @ApiResponse({status: 200, type: Role})
    @Post('/create_role')
    createVisitorService(@Body() roleDto: createRoleDto){
        return this.rolesService.createRole(roleDto)
    }

    @ApiOperation({summary: 'Получить все услуги пользователей за все время'})
    @ApiResponse({status: 200, type: [Role]})
    @Get('/roles')
    getAllVisitorsServices() {
        return this.rolesService.getAllRoles()
    }
}
