import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRole } from "src/users_roles/users_roles.model";

interface RoleCreationAttrs {
    title: string
    role: string
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
    @ApiProperty({ example: 1, description: 'PK unic indicate' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
    @Column({ type: DataType.TEXT, allowNull: false })
    title: string

    @ApiProperty({ example: 'admin', description: 'Значение роли (admin/supperadmin/director)' })
    @Column({ type: DataType.TEXT, allowNull: false })
    role: string

    @BelongsToMany(() => User, () => UserRole)
    Users: User[]
}