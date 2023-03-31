import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRole } from "src/users_roles/users_roles.model";

interface UserCreationAttrs {
    email: string;
    password: string;
    phone: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs>{
    @ApiProperty({ example: 1, description: 'PK unic indicate' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'Nikita', description: 'user name' })
    @Column({ type: DataType.STRING })
    name: string;

    @ApiProperty({ example: 'Romanov', description: 'user lastname' })
    @Column({ type: DataType.STRING })
    lastname: string;

    @ApiProperty({ example: 'kodtochka32@gmail.com', description: 'user email' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({ example: 'IsJA#1@d#$1Zz2T', description: 'user email' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ApiProperty({ example: '79085060871', description: 'user phone' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    phone: string;

    @BelongsToMany(() => Role, () => UserRole)
    Roles: Role[]
}