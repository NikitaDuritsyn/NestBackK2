import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSessionDto } from './dto/create-session.dto';
import { Session } from './sessions.model';

@Injectable()
export class SessionsService {
    constructor(@InjectModel(Session) private sessionRepostiry: typeof Session) { }

    // const visitors = await
    // console.log(dto.session);
    // console.log(dto.visitors);
    // console.log(dto.rooms);
    async createSession(dto: CreateSessionDto) {
        const session = await this.sessionRepostiry.create(dto.session)
        return session
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
