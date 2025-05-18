/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PlatoService } from './plato.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatoEntity } from './plato.entity/plato.entity';
import { PlatoController } from './plato.controller';

@Module({
  providers: [PlatoService],
  imports: [TypeOrmModule.forFeature([PlatoEntity])],
  exports: [PlatoService],
  controllers: [PlatoController],
})
export class PlatoModule {}