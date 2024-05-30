import { Module } from '@nestjs/common';
import { SneakerService } from './sneaker.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sneaker } from 'src/entity/sneaker.entity';
import { SneakerController } from './sneaker.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Sneaker])],
    providers: [SneakerService],
    controllers: [SneakerController]
})
export class SneakerModule {}
