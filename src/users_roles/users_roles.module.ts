import { Module } from '@nestjs/common';
import { UsersRolesController } from './users_roles.controller';
import { UsersRolesService } from './users_roles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRole } from './users_roles.model';
import { User } from 'src/users/users.model';
import { Role } from 'src/roles/roles.model';

@Module({
  controllers: [UsersRolesController],
  providers: [UsersRolesService],
  imports: [
    SequelizeModule.forFeature([UserRole, User, Role])
  ],
  exports: [
    UsersRolesService
  ]
})
export class UsersRolesModule { }
