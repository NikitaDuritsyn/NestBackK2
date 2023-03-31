import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class CreateSessionDto {
    @ApiProperty({ example: { booked_date: "2023-03-02T20:00:00.000Z", estimate_session_duration: 120, tariff_id: 2, status: "booked", estimate_visitors_num: 2 }, description: 'Session data for create/booked session' })
    session: {}

    @ApiProperty({ example: [{ name: "Nikita", last_name: "Romanov", number_phone: "89085060871", deposit: { paymet_type_id: 1, value: "250" }, deponent: "", tariff_id: "1", status: "booked" }, { name: "Darya", last_name: "Romanova", number_phone: "89085067777", deposit: "", deponent: { value: "250" }, tariff_id: "1", status: "booked" }], description: 'Visitros data for create/booked session' })
    visitors: [{
        session_id: number
        tariff_id: number
        name: string
        status: string
        deponent: {
            visitor_id: number;
            deponent_value: number;
            status: string;
        }
        deposit: {
            visitor_id: number
            paymet_type_id: number
            client_id: number
            deposit_value: number
        }
    }]

    @ApiProperty({ example: [1, 2], description: 'Rooms data (RoomsId) for create/booked session' })
    rooms: []
}