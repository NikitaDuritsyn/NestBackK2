import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class CreateUserDto {
    @ApiProperty({ example: 'Nikita', description: 'user name' })
    name: string

    @ApiProperty({ example: 'Duritsyn', description: 'user lastname' })
    lastname: string

    @ApiProperty({ example: 'kodtochka32@gmail.com', description: 'user email' })
    email: string;

    @ApiProperty({ example: 'IsJA#1@d#$1Zz2T', description: 'user email' })
    password: string;

    @ApiProperty({ example: '79085060871', description: 'user phone' })
    phone: string;

    @ApiProperty({ example: [1, 2, 3, 4], description: 'user roleId' })
    roles_id: [number];
}