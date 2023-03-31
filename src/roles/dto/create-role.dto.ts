import { ApiProperty } from "@nestjs/swagger"

export class createRoleDto {
    @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
    title: string

    @ApiProperty({ example: 'admin', description: 'Значение роли (admin/supperadmin/director)' })
    role: string
}