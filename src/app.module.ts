import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlatoEntity } from './plato/plato.entity/plato.entity';
import { PlatoModule } from './plato/plato.module';
import { RestauranteEntity } from './restaurante/restaurante.entity/restaurante.entity';
import { RestauranteModule } from './restaurante/restaurante.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [RestauranteEntity, PlatoEntity],
      synchronize: true,
      dropSchema: true,
    }),
    RestauranteModule,
    PlatoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
