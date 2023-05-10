import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { User } from "src/users/users.model";

interface UserRoleCreationAttrs {
    user_id: number;
    role_id: number;
}

@Table({ tableName: 'users_roles' })
export class UserRole extends Model<UserRole, UserRoleCreationAttrs>{

    @ApiProperty({ example: 1, description: 'PK unic indicate' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 1, description: 'Ссылка на id пользователя' })
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    user_id: number;

    @ApiProperty({ example: 1, description: 'Ссылка на id роли' })
    @ForeignKey(() => Role)
    @Column({ type: DataType.INTEGER, allowNull: false })
    role_id: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Role)
    role: Role;
}