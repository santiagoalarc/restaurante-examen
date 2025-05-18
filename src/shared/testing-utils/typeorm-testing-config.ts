/* eslint-disable prettier/prettier */
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatoEntity } from '../../plato/plato.entity/plato.entity';
import { RestauranteEntity } from '../../restaurante/restaurante.entity/restaurante.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [RestauranteEntity, PlatoEntity],
    synchronize: true
  }),
  TypeOrmModule.forFeature([RestauranteEntity, PlatoEntity]),
];
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/
