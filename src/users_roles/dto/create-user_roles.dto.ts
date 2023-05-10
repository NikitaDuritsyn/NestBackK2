import { ApiProperty } from "@nestjs/swagger";

export class CreateUserRolesDto {
    @ApiProperty({ example: 1, description: 'Ссылка на id пользователя' })
    user_id: number;

    @ApiProperty({ example: [1, 2, 3, 4], description: 'Массив id ролей' })
    roles_id: [number];
}