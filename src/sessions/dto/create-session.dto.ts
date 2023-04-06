import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { CreateVisitorDto } from "src/visitors/dto/create-visitor.dto";

export class CreateSessionDto {
    @ApiProperty({ example: { booked_date: "2023-03-02T20:00:00.000Z", estimate_session_duration: 120, tariff_id: 2, status: "booked", estimate_visitors_num: 2 }, description: 'Session data for create/booked session' })
    session: {
        booked_date: Date;
        estimate_session_duration: number;
        tariff_id: number;
        status: string;
        estimate_visitors_num: number;
    }

    @ApiProperty({ example: [{ name: "Nikita", last_name: "Romanov", number_phone: "89085060871", deposit: { payment_type_id: 1, value: "250" }, deponent: "", tariff_id: "1", status: "booked" }, { name: "Darya", last_name: "Romanova", number_phone: "89085067777", deposit: "", deponent: { value: "250" }, tariff_id: "1", status: "booked" }], description: 'Visitros data for create/booked session' })
    visitors: CreateVisitorDto[]

    @ApiProperty({ example: [1, 2], description: 'Rooms data (RoomsId) for create/booked session' })
    rooms: []
}