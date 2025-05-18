import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantePlatoService } from './restaurante-plato.service';
import {
  RestauranteEntity,
  TipoCocina,
} from '../restaurante/restaurante.entity/restaurante.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  CategoriaPlato,
  PlatoEntity,
} from '../plato/plato.entity/plato.entity';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('RestaurantePlatoService', () => {
  let service: RestaurantePlatoService;
  let restauranteRepository: Repository<RestauranteEntity>;
  let platoRepository: Repository<PlatoEntity>;
  let restaurantesList: RestauranteEntity[];
  let platosList: PlatoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RestaurantePlatoService],
    }).compile();

    service = module.get<RestaurantePlatoService>(RestaurantePlatoService);
    restauranteRepository = module.get<Repository<RestauranteEntity>>(
      getRepositoryToken(RestauranteEntity),
    );
    platoRepository = module.get<Repository<PlatoEntity>>(
      getRepositoryToken(PlatoEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    await restauranteRepository.clear();
    await platoRepository.clear();

    restaurantesList = [];
    platosList = [];
    for (let i = 0; i < 5; i++) {
      const restaurante: RestauranteEntity = await restauranteRepository.save({
        id: `${i}`,
        nombre: `Restaurante ${i}`,
        direccion: `Dirección ${i}`,
        tipoCocina: TipoCocina.ITALIANA,
        paginaWeb: `www.restaurante${i}.com`,
      });
      restaurantesList.push(restaurante);
    }
    for (let i = 0; i < 5; i++) {
      const plato: PlatoEntity = await platoRepository.save({
        id: `${i}`,
        nombre: `Plato ${i}`,
        descripcion: `Descripción ${i}`,
        precio: 10 + i,
        categoria: CategoriaPlato.ENTRADA,
      });
      platosList.push(plato);
    }
  };
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addPlatoToRestaurante should add a plato to a restaurante', async () => {
    const plato = platosList[0];
    const restaurante = restaurantesList[0];

    const result = await service.addPlatoToRestaurante(
      restaurante.id,
      plato.id,
    );

    expect(result.platos[0].precio).toEqual(plato.precio);
    expect(result.platos[0].descripcion).toEqual(plato.descripcion);
    expect(result.platos[0].nombre).toEqual(plato.nombre);
  });

  it('findPlatosFromRestaurante should return platos from a restaurante', async () => {
    const restaurante = restaurantesList[0];
    const plato = platosList[0];

    await service.addPlatoToRestaurante(restaurante.id, plato.id);

    const result = await service.findPlatosFromRestaurante(restaurante.id);

    expect(result[0].categoria).toEqual(plato.categoria);
    expect(result[0].precio).toEqual(plato.precio);
    expect(result[0].descripcion).toEqual(plato.descripcion);
    expect(result[0].nombre).toEqual(plato.nombre);
  });

  it('findPlatoFromRestaurante should return a plato from a restaurante', async () => {
    const restaurante = restaurantesList[0];
    const plato = platosList[0];

    await service.addPlatoToRestaurante(restaurante.id, plato.id);

    const result = await service.findPlatoFromRestaurante(
      restaurante.id,
      plato.id,
    );

    expect({ ...result, id: result.id.toString() }).toEqual(plato);
  });
});
