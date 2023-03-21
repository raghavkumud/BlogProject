import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt, } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,) {
    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_SECRET'),
        })
    }
    async validate(payload: {
        sub: string,
        email: string,
    }) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub,
            }
        })
        delete user.hash;
        console.log({
            user
        })
        return user;
    }
}