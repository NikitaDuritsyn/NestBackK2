import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './rooms.model';

@Injectable()
export class RoomsService {

    constructor(@InjectModel(Room) private roomRepository: typeof Room) { }

    async createRoom(dto: CreateRoomDto) {
        const room = await this.roomRepository.create(dto)
        return room
    }

    async getAllRooms() {
        const rooms = await this.roomRepository.findAll()
        return rooms
    }

    async deleteRoomById(roomId: number) {
        const room = await this.roomRepository.destroy({ where: { id: roomId } })
        return room
    }

}
