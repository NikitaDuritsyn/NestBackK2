import { Injectable } from '@nestjs/common';
import { SessionRoom } from './sessions_rooms.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSessionRoomDto } from './dto/create-session_room.dto';

@Injectable()
export class SessionsRoomsService {
    constructor(@InjectModel(SessionRoom) private sessionRoomRepository: typeof SessionRoom) { }

    async createSessionRoom(dto: CreateSessionRoomDto) {
        console.log(dto);
        const sessionRoom = await this.sessionRoomRepository.create(dto);
        return sessionRoom
    }

    async getAllSessionsRooms() {
        const sessionsRooms = await this.sessionRoomRepository.findAll();
        return sessionsRooms
    }

    async getRoomsIdBySession(sessionsId: number) {
        const roomsIdBySession = await this.sessionRoomRepository.findAll({ attributes: ['room_id'], where: { session_id: sessionsId } })
        return roomsIdBySession
    }
}
