import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class CreateClientDto {
    @ApiProperty({ example: "Nikita", description: 'Client Name' })
    name: string;

    @ApiProperty({ example: "79085060871", description: 'Client phone' })
    number_phone: string;
}