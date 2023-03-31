import { Injectable } from '@nestjs/common';
import { Role } from './roles.model';
import { createRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private RoleRepository: typeof Role) { }

    async createRole(dto: createRoleDto) {
        const role = await this.RoleRepository.create(dto);
        return role
    }

    async getAllRoles() {
        const roles = await this.RoleRepository.findAll();
        return roles
    }
}
