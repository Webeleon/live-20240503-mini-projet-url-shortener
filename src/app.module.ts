import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './configurations/database.config';
import { UrlModule } from './url/url.module';
import { Url } from './url/entities/url.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [databaseConfig],
        }),
        ConfigModule.forFeature(databaseConfig),
      ],
      inject: [databaseConfig.KEY],
      useFactory: (config: ConfigType<typeof databaseConfig>) => {
        return {
          ...config,
          entities: [Url],
          synchronize: true,
        };
      },
    }),
    UrlModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
