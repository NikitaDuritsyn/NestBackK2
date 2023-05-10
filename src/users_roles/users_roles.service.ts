import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRole } from './users_roles.model';
import { CreateUserRoleDto } from './dto/create-user_role.dto';
import { CreateUserRolesDto } from './dto/create-user_roles.dto';

@Injectable()
export class UsersRolesService {
    constructor(@InjectModel(UserRole) private userRoleRepository: typeof UserRole) { }

    async createUserRole(dto: CreateUserRoleDto) {
        const userRole = await this.userRoleRepository.create(dto);
        return userRole
    }
    async createUserRoles(dto: CreateUserRolesDto) {
        const userRoles = await this.userRoleRepository.bulkCreate(dto.roles_id.map((item => { return { user_id: dto.user_id, role_id: item } })));
        return userRoles
    }

    async getAllUsersRoles() {
        const usersRoles = await this.userRoleRepository.findAll();
        return usersRoles
    }
}
