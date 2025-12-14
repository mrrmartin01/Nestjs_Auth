import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { SignInDto } from 'src/auth/dto/signIn.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  beforeAll(async () => {
    console.log('Compiling module....');
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    console.log('Creating app...');
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
    await app.listen(3333);

    console.log('Getting Prisma service...');
    prisma = app.get(PrismaService);

    console.log('Cleaning DB...');
    await prisma.cleanDatabase();

    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Auth', () => {
    const signupDto: CreateUserDto = {
      email: 'testUser@example.app',
      password: 'IamSpiderMan!1',
      firstName: 'Peter',
      lastName: 'Parker',
    };
    const signInDto: SignInDto = {
      email: 'testUser@example.app',
      password: 'IamSpiderMan!1',
    };
    const weakPasswordSignUpDto: CreateUserDto = {
      email: 'weakpass@test.app',
      password: 'password123',
      firstName: 'Weak',
      lastName: 'Password',
    };
    const nonExistingUserSignInDto: SignInDto = {
      email: 'fakeuser@test.app',
      password: 'SomePassword!1',
    };

    describe('POST /auth/signup', () => {
      it('should throw if form is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({})
          .expectStatus(400);
      });
      it('should throw if email is missing', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: signupDto.password,
            firstName: signupDto.firstName,
            lastName: signupDto.lastName,
          })
          .expectStatus(400);
      });

      it('should throw if password is missing', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: signupDto.email,
            firstName: signupDto.firstName,
            lastName: signupDto.lastName,
          })
          .expectStatus(400);
      });
      it('should throw if password is weak', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(weakPasswordSignUpDto)
          .expectStatus(400);
      });
      it('should pass signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(signupDto)
          .expectStatus(201);
      });
      it('should throw if email is taken', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(signupDto)
          .expectStatus(409);
      });
    });
    describe('POST /auth/signin', () => {
      it('should throw if form is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({})
          .expectStatus(400);
      });
      it('should throw if email is missing', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password: signInDto.password })
          .expectStatus(400);
      });

      it('should throw if password is missing', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: signInDto.email })
          .expectStatus(400);
      });
      it('should throw if credentials are invalid', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: nonExistingUserSignInDto.email,
            password: nonExistingUserSignInDto.password,
          })
          .expectStatus(401);
      });
      it('should signin successfully', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(signInDto)
          .expectStatus(200);
      });
    });
    describe('POST /auth/refresh', () => {
      it('should throw if no refresh token is provided', () => {
        return pactum.spec().post('/auth/refresh').expectStatus(401);
      });
      it('should refresh tokens', () => {
        return pactum
          .spec()
          .post('/auth/refresh')
          .withCookies({})
          .expectStatus(200);
      });
    });
  });
});
