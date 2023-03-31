import { Controller, Post, Get, Body } from '@nestjs/common';
import { UsersRolesService } from './users_roles.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserRoleDto } from './dto/create-user_role.dto';
import { UserRole } from './users_roles.model';

@Controller('users-roles')
export class UsersRolesController {
    constructor(private usersRolesService: UsersRolesService) { }

    @ApiOperation({ summary: 'Создать услугу пользователя' })
    @ApiResponse({ status: 200, type: UserRole })
    @Post('/create_user_role')
    createUserRole(@Body() visittorServiceDto: CreateUserRoleDto) {
        return this.usersRolesService.createUserRole(visittorServiceDto)
    }

    @ApiOperation({ summary: 'Получить все услуги пользователей за все время' })
    @ApiResponse({ status: 200, type: [UserRole] })
    @Get('/users_roles')
    getAllUsersRoles() {
        return this.usersRolesService.getAllUsersRoles()
    }
}
