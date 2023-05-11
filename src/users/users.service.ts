import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersRolesService } from 'src/users_roles/users_roles.service';
import { Op } from 'sequelize';
import { Role } from 'src/roles/roles.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
        private usersRolesService: UsersRolesService) { }

    async createUser(dto: CreateUserDto) {
        const userCheck = await this.findUser(dto)
        console.log(userCheck);

        if (!userCheck) {
            const user = await this.userRepository.create(dto);
            const userRoleCreate = await this.usersRolesService.createUserRoles({ user_id: user.id, roles_id: dto.roles_id })
            return { massage: `Пользователь ${user.name}, создан!` }
        } else {
            return { massage: `Такой пользователь уже существует` }
        }
    }

    async findUser(dto: CreateUserDto) {
        const user = await this.userRepository.findOne({
            where: {
                [Op.or]: [
                    { email: dto.email },
                    { phone: dto.phone }
                ]
            }
        });
        return user
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({
            include: [{
                model: Role,
                through: {
                    attributes: []
                }
            }]
        });
        return users.sort((a, b) => a.id - b.id);
    }

    async udapteUser(userData: CreateUserDto, userId: number) {
        const user = await this.userRepository.update(userData, { where: { id: userId } });
        return { user, massage: 'Пользователь изменен' }
    }

    async deleteUser(userId: number) {
        const user = await this.userRepository.destroy({ where: { id: userId } });
        return { user, massage: 'Пользователь изменен' }
    }
}
