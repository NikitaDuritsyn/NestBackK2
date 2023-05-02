import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSessionDto } from './dto/create-session.dto';
import { Session } from './sessions.model';
import { VisitorsService } from 'src/visitors/visitors.service';
import { SessionsRoomsService } from 'src/sessions_rooms/sessions_rooms.service';
import { Op } from 'sequelize';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class SessionsService {
    constructor(
        @InjectModel(Session) private sessionRepostiry: typeof Session,
        private visitorService: VisitorsService,
        private sessionsRoomsService: SessionsRoomsService) { }

    isOverlapping(start1: Date, end1: Date, start2: Date, end2: Date) {
        return new Date(start1).getTime() < new Date(end2).getTime() && new Date(start2).getTime() < new Date(end1).getTime();
    }
    async checkOverlap(dto: CreateSessionDto) {
        const startDate = new Date(new Date(dto.session.booked_date).setHours(0, 0, 0, 0))
        const endDate = new Date(new Date(new Date().setDate(new Date(dto.session.booked_date).getDate() + 1)).setHours(0, 0, 0, 0))
        const sessionsBookedThisDay = await this.getSessionsByDates(startDate, endDate)
        const newSessionBookedStartTime = dto.session.booked_date
        const newSessionBookedEndTime = new Date(new Date(dto.session.booked_date).setTime(new Date(dto.session.booked_date).getTime() + dto.session.estimate_session_duration * 60000));
        for (let i = 0; i < sessionsBookedThisDay.length; i++) {
            const sessionBookedStartTime = sessionsBookedThisDay[i].booked_date;
            const sessionBookedEndTime = new Date(new Date(sessionsBookedThisDay[i].booked_date).setTime(new Date(sessionsBookedThisDay[i].booked_date).getTime() + sessionsBookedThisDay[i].estimate_session_duration * 60000));
            const sessionBookedRooms = await this.sessionsRoomsService.getRoomsIdBySession(sessionsBookedThisDay[i].id)

            if (this.isOverlapping(newSessionBookedStartTime, newSessionBookedEndTime, sessionBookedStartTime, sessionBookedEndTime) && dto.rooms.every(value => sessionBookedRooms.map(item => item.dataValues.room_id).includes(value))) {
                return true;
            }
        }
        return false;
    }
    async createSession(dto: CreateSessionDto) {
        const checkOverlapSessions = await this.checkOverlap(dto)
        if (checkOverlapSessions) {
            return { massage: 'Сессия не может быть создана, происходит наложение по времени' }
        }
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
            return { massage: 'Сессия создана' }
        } else {
            return { massage: 'ERROR: Нужен хотябы один пользователь' }
        }
    }
    async getAllSessions() {
        const sessions = await this.sessionRepostiry.findAll()
        return sessions
    }
    async getSessionsByDates(startDate: Date, endDate: Date) {
        const sessions = await this.sessionRepostiry.findAll({
            where: {
                booked_date: {
                    [Op.between]: [startDate.toISOString(), endDate.toISOString()],
                },
            }
        })
        return sessions
    }
    async getSessionsByDays(days: number) {
        const sessionsArray = []
        const daysRange = days || 10
        const startDate = new Date(new Date(new Date().setDate(new Date().getDate() - 2)).setHours(0, 0, 0, 0))
        const endDate = new Date(new Date(new Date().setDate(new Date().getDate() + Number(daysRange) - 2)).setHours(0, 0, 0, 0))
        const sessions = await this.getSessionsByDates(startDate, endDate)

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
    async getSessionById(sessionId: number) {
        const session = await this.sessionRepostiry.findOne({ where: { id: sessionId } })
        const rooms = await this.sessionsRoomsService.getRoomsIdBySession(sessionId)
        const sessionData = { ...session.dataValues, session_rooms: rooms }
        return sessionData
    }
    async deleteSessionById(sessionId: number) {
        const sessionDeleted = await this.sessionRepostiry.destroy({ where: { id: sessionId } })
        return sessionDeleted
    }
    async updateSession(dto: UpdateSessionDto, sessionId: number) {
        console.log(dto);
        console.log(sessionId);

        const sessionUpdated = await this.sessionRepostiry.update(dto, { where: { id: sessionId } })
        return sessionUpdated
    }
    async updateSessionStartTime(sessionId: number) {
        const startTimeSession = await this.visitorService.getStartTimeSessionByVisitors(sessionId)
        const sessionUpdated = await this.sessionRepostiry.update({ start_time_session: startTimeSession, status: 'active' }, { where: { id: sessionId } })
        return sessionUpdated
    }
    async updateSessionEndTime(sessionId: number) {
        const endTimeSession = await this.visitorService.getEndTimeSessionByVisitors(sessionId)
        console.log(endTimeSession);
        if (endTimeSession) {
            const sessionUpdated = await this.sessionRepostiry.update({ end_time_session: endTimeSession, status: 'close' }, { where: { id: sessionId } })
            return sessionUpdated
        }
        return null
    }
}
