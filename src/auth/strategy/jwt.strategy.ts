import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    const secret = configService.get<string>('JWT_SECRET_KEY', { infer: true });
    if (!secret) {
      throw new Error('JWT_SECRET_KEY is not set in configuration');
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: secret,
      ignoreExpiration: false,
    });
  }

  private static extractJWT(this: void, req: Request): string | null {
    if (req.cookies?.access_token) {
      return req.cookies.access_token as string;
    }
    return null;
  }

  async validate(payload: { id: string }): Promise<User> {
    const userId = payload.id;
    if (!userId) {
      throw new UnauthorizedException('Invalid token payload');
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const userWithoutPassword = { ...user };
    delete (userWithoutPassword as Partial<User>).passwordHash;

    return userWithoutPassword as User;
  }
}
