import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createUser: CreateUserDto = {
    login:'serega',
    password: "12345"
  } 

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Post', () => {
    return request(app.getHttpServer())
      .post('user')
      .set('Accept', 'application/json')
      .send(createUser)
      .expect(201)
      .expect(({ body }) => {
                expect(body.login).toEqual(createUser.login);
                expect(body.password).toBeDefined();
              })
      .expect(HttpStatus.CREATED);
  });
});
