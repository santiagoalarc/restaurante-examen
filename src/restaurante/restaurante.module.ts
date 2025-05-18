/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RestauranteService } from './restaurante.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestauranteEntity } from './restaurante.entity/restaurante.entity';

@Module({
  providers: [RestauranteService],
  imports: [TypeOrmModule.forFeature([RestauranteEntity])],
  exports: [RestauranteService],
  controllers: [],
})
export class RestauranteModule {}
