import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class CreateUserDto {
    @ApiProperty({ example:'kodtochka32@gmail.com', description: 'user email' })
    readonly email: string;

    @ApiProperty({ example:'IsJA#1@d#$1Zz2T', description: 'user email' })
    readonly password: string;

    @ApiProperty({ example:'79085060871', description: 'user phone' })
    readonly phone: string;

}