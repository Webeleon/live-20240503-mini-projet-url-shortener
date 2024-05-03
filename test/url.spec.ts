import { TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getTestingModule } from './helpers/testing-module.utils';

describe('Url (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await getTestingModule();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('create and list', async () => {
    const postResponse = await request(app.getHttpServer()).post('/url').send({
      url: 'https://twitch.tv/webeleon',
    });
    expect(postResponse.status).toBe(201);
    expect(postResponse.body.shortCode).toBeDefined();
    expect(postResponse.body.url).toBe('https://twitch.tv/webeleon');

    const listResponse = await request(app.getHttpServer()).get('/url');
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.length).toBe(1);
    expect(listResponse.body[0].url).toBe('https://twitch.tv/webeleon');

    const redirectResponse = await request(app.getHttpServer()).get(
      `/r/${postResponse.body.shortCode}`,
    );

    expect(redirectResponse.status).toBe(301);
  });
});
