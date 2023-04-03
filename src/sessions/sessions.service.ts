import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSessionDto } from './dto/create-session.dto';
import { Session } from './sessions.model';
import { VisitorsService } from 'src/visitors/visitors.service';
import { SessionsRoomsService } from 'src/sessions_rooms/sessions_rooms.service';
import { Op } from 'sequelize';

@Injectable()
export class SessionsService {
    constructor(@InjectModel(Session) private sessionRepostiry: typeof Session, private visitorService: VisitorsService, private sessionsRoomsService: SessionsRoomsService) { }

    async createSession(dto: CreateSessionDto) {
        // Проверку на пользователей и др пля перенести в midleWhere
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
        const sessionsArray = []
        const daysRange = days || 10
        const startDate = new Date(new Date(new Date().setDate(new Date().getDate() - 2)).setHours(0, 0, 0, 0)).toISOString()
        const endDate = new Date(new Date(new Date().setDate(new Date().getDate() + Number(daysRange) - 2)).setHours(0, 0, 0, 0)).toISOString()
        const sessions = await this.sessionRepostiry.findAll({
            where: {
                booked_date: {
                    [Op.between]: [startDate, endDate],
                },
            }
        })
        for (let i = 0; i < sessions.length; i++) {
            const session = {
                ...sessions[i].dataValues,
                time_booking: new Date(sessions[i].booked_date).getHours() * 60 + new Date(sessions[i].booked_date).getMinutes(),
                index_day: null,
                visitors: await this.visitorService.getVisitorsBySession(sessions[i].id),
                session_rooms: await this.sessionsRoomsService.getRoomsIdBySession(sessions[i].id),
            }
            sessionsArray.push(session)
        }
        for (let i = -2; i < daysRange - 2; i++) {
            let date = new Date(new Date().setDate(new Date().getDate() + i)).setHours(0, 0, 0, 0)
            for (let j = 0; j < sessionsArray.length; j++) {
                if (new Date(sessionsArray[j].booked_date).toLocaleDateString() === new Date(date).toLocaleDateString()) {
                    sessionsArray[j].index_day = i + 2
                }
            }
        }
        return sessionsArray
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
