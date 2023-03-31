import { ApiProperty } from "@nestjs/swagger";

export class CreateUserRoleDto {
    @ApiProperty({ example: 1, description: 'Ссылка на id пользователя' })
    user_id: number;
    
    @ApiProperty({ example: 1, description: 'Ссылка на id роли' })
    role_id: number;
}