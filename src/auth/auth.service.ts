import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPassword, verifyPassword } from './utils/password.utils';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import type { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(dto: CreateUserDto): Promise<{ message: string }> {
    if (!dto)
      throw new BadRequestException({
        message: 'You can not summit an empty form',
        error: 'EMPTY_FORM',
        statusCode: 'E1001',
      });

    if (!dto.email || !dto.password || !dto.firstName || !dto.lastName)
      throw new BadRequestException({
        message: 'You must fill all the required form fields',
        error: 'PARTIAL_DATA_INPUT',
        statusCode: 'E1001A',
      });

    const ExistingUser: User | null = await this.prisma.user.findFirst({
      where: { email: dto.email },
    });

    if (ExistingUser)
      throw new BadRequestException({
        message: 'User with this email already exists',
        error: 'USER_ALREADY_EXISTS',
        statusCode: 'E1002',
      });

    const hash = await hashPassword(dto.password);

    await this.prisma.user.create({
      data: {
        firstName: dto.firstName.toLocaleLowerCase().trim(),
        lastName: dto.lastName.toLocaleLowerCase().trim(),
        email: dto.email.toLocaleLowerCase().trim(),
        passwordHash: hash,
      },
    });
    return { message: 'User created successfully' };
  }

  private generateTokens(payload: { id: string; email: string }): Tokens {
    const access_token: string = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
      expiresIn: '15m', // access token expires in 15 minutes
    });

    const refresh_token: string = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '7d', // refresh token expires in 7 days
    });

    return {
      access_token,
      refresh_token,
    };
  }

  async signIn(dto: SignInDto): Promise<AuthSignInResponse> {
    if (!dto)
      throw new BadRequestException({
        message: 'You can not summit an empty form',
        error: 'EMPTY_FORM',
        statusCode: 'E1001',
      });

    if (!dto.email || !dto.password)
      throw new BadRequestException({
        message: 'You must fill all the required form fields',
        error: 'PARTIAL_DATA_INPUT',
        statusCode: 'E1001A',
      });

    const user: User | null = await this.prisma.user.findFirst({
      where: {
        email: dto.email.toLocaleLowerCase().trim(),
      },
    });

    if (!user)
      throw new NotFoundException({
        message: 'Not user exists with such credentials',
        error: 'USER_NOT_FOUND',
        statusCode: 'N0404',
      });

    const unhashedPassword: boolean = await verifyPassword(
      user.passwordHash,
      dto.password,
    );

    if (!unhashedPassword)
      throw new UnauthorizedException({
        message: 'Invalid email or password',
        error: 'WRONG_CREDENTALS',
        statusCode: 'U1001',
      });

    const tokens = this.generateTokens({ id: user.id, email: user.email });

    const safeUser: AuthUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return { ...tokens, user: safeUser };
  }

  async refreshTokens(refresh_token: string): Promise<Tokens> {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        refresh_token,
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        },
      );

      // Verify that the user still exists
      const user: User | null = await this.prisma.user.findUnique({
        where: { id: payload.id },
      });

      if (!user) {
        throw new UnauthorizedException('User no longer exists');
      }

      // Generate new tokens
      return this.generateTokens({
        id: payload.id,
        email: payload.email,
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async forgotPassword(
    email: string,
    password: string,
  ): Promise<{ message: string }> {
    if (!email)
      throw new BadRequestException({
        message: 'You can not summit an empty form',
        error: 'EMPTY_FORM',
        statusCode: 'E1001',
      });

    const user: User | null = await this.prisma.user.findUnique({
      where: { email: email.toLocaleLowerCase().trim() },
    });
    if (!user)
      throw new NotFoundException({
        message: 'Not user exists with such credentials',
        error: 'USER_NOT_FOUND',
        statusCode: 'N0404',
      });

    const samePassword: boolean = await verifyPassword(
      user.passwordHash,
      password,
    );

    if (samePassword)
      throw new ForbiddenException({
        message: 'Please enter a different password from the previous one',
        error: 'SAME_PASSWORD',
        status: 'SP1001',
      });

    const hash = await hashPassword(password);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: hash,
      },
    });
    return { message: 'Password reset successful' };
  }
}

interface Tokens {
  access_token: string;
  refresh_token: string;
}

interface JwtPayload {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}

interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthSignInResponse extends Tokens {
  user: AuthUser;
}
