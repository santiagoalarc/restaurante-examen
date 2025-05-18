/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PlatoService } from './plato.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatoEntity } from './plato.entity/plato.entity';

@Module({
  providers: [PlatoService],
  imports: [TypeOrmModule.forFeature([PlatoEntity])],
  exports: [PlatoService],
})
export class PlatoModule {}