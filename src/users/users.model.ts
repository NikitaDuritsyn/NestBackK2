import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { Column, DataType, Model, Table } from "sequelize-typescript";

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

    @ApiProperty({ example:'Nikita', description: 'user name' })
    @Column({ type: DataType.STRING })
    name: string;

    @ApiProperty({ example:'Romanov', description: 'user lastname' })
    @Column({ type: DataType.STRING })
    lastname: string;

    @ApiProperty({ example:'kodtochka32@gmail.com', description: 'user email' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({ example:'IsJA#1@d#$1Zz2T', description: 'user email' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;


    @ApiProperty({ example:'79085060871', description: 'user phone' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    phone: string;

    @ApiProperty({ example:'superAdmin', description: 'user status (director/admin/superAdmin)' })
    @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'user' })
    role: string; // Нужно созать модель для того чтобы на нее ключи прокидывать а так это херня

}