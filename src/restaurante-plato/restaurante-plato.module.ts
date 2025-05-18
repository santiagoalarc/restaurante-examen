import { Module } from '@nestjs/common';
import { RestaurantePlatoService } from './restaurante-plato.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestauranteEntity } from '../restaurante/restaurante.entity/restaurante.entity';
import { PlatoEntity } from '../plato/plato.entity/plato.entity';
import { RestaurantePlatoController } from './restaurante-plato.controller';

@Module({
  providers: [RestaurantePlatoService],
  imports: [TypeOrmModule.forFeature([RestauranteEntity, PlatoEntity])],
  exports: [RestaurantePlatoService],
  controllers: [RestaurantePlatoController],
})
export class RestaurantePlatoModule {}
