import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';
import { UserRole } from 'src/users_roles/users_roles.model';
import { Role } from 'src/roles/roles.model';
import { UsersRolesModule } from 'src/users_roles/users_roles.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, UserRole, Role]),
    UsersRolesModule,
  ]
})
export class UsersModule { }