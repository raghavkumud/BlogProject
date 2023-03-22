import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt/dist";
import { ConfigService } from "@nestjs/config/dist/config.service";
@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }
    async signin(dto: AuthDto) {
        try {
            const user = await this.prisma.user.findUnique(
                {
                    where: {
                        email: dto.email
                    }
                }
            )
            if (!user) throw new ForbiddenException('Credentials Incorrect');

            const match = await argon.verify(user.hash, dto.password);
            if (!match) throw new ForbiddenException('Credentials Incorrect');
            return this.signToken(user.id, user.email);
        } catch (error) {
            return error;
        }
    }
    async signup(dto: AuthDto) {
        try {
            const hash = await argon.hash(dto.password);
            const user = await this.prisma.user.create(
                {
                    data:
                    {
                        email: dto.email,
                        hash,
                        username: dto.username
                    }
                }
            )
            delete user.hash;
            return this.signToken(user.id, user.email);

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(
                        'Credentials taken',
                    )
                }
            }
            throw error;
        }
    }
    async signToken(userId: String, email: String): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email,
        }
        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '14400m',
            secret,
        })
        return {
            access_token: token,
        }
    }
}