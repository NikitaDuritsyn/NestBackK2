import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSessionDto } from './dto/create-session.dto';
import { Session } from './sessions.model';
import { VisitorsService } from 'src/visitors/visitors.service';
import { SessionsRoomsService } from 'src/sessions_rooms/sessions_rooms.service';

@Injectable()
export class SessionsService {
    constructor(@InjectModel(Session) private sessionRepostiry: typeof Session, private visitorService: VisitorsService, private sessionsRoomsService: SessionsRoomsService) { }

    async createSession(dto: CreateSessionDto) {
        if (dto.visitors.length > 0) {
            const session = await this.sessionRepostiry.create(dto.session)

            for (let i = 0; i < dto.visitors.length; i++) {
                const visitorData = {
                    ...dto.visitors[i],
                    session_id: session.id,
                    tariff_id: session.tariff_id
                }
                await this.visitorService.createVisitor(visitorData);
            }
            
            for (let i = 0; i < dto.rooms.length; i++) {
                await this.sessionsRoomsService.createSessionRoom({ session_id: session.id, room_id: dto.rooms[i] })
            }

            return session
        } else {
            return { massage: 'ERROR: Нужен хотябы один пользователь' }
        }

    }

    async getAllSessions() {
        const sessions = await this.sessionRepostiry.findAll()
        return sessions
    }

    async getSessionsByDays(days: number) {
        const sessions = await this.sessionRepostiry.findAll()

        return sessions
    }

    async getSessionById(id: number) {
        const sessions = await this.sessionRepostiry.findAll()

        return sessions
    }

    async deleteSessionById(id: number) {
        const sessions = await this.sessionRepostiry.findAll()

        return sessions
    }

}
