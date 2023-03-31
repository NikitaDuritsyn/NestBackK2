import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRole } from './users_roles.model';
import { CreateUserRoleDto } from './dto/create-user_role.dto';

@Injectable()
export class UsersRolesService {
    constructor(@InjectModel(UserRole) private userRoleRepository: typeof UserRole) { }

    async createUserRole(dto: CreateUserRoleDto) {
        const userRole = await this.userRoleRepository.create(dto);
        return userRole
    }

    async getAllUsersRoles() {
        const usersRoles = await this.userRoleRepository.findAll();
        return usersRoles
    }
}
