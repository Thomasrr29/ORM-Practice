import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SneakerModule } from './module/sneaker/sneaker/sneaker.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'bgfmodfynqmju2ta4q16-mysql.services.clever-cloud.com',
      port: 3306,
      username: 'umxjx0l0ehfyjl6l',
      password: 'HIJ3tTifQ26wTDDkcdIL',
      database: 'bgfmodfynqmju2ta4q16',
      autoLoadEntities: true,
      synchronize: true,
    }),
    SneakerModule,
  ],
})
export class AppModule {}