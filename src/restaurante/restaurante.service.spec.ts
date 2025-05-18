import { Test, TestingModule } from '@nestjs/testing';
import { RestauranteService } from './restaurante.service';
import {
  RestauranteEntity,
  TipoCocina,
} from './restaurante.entity/restaurante.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException } from '../shared/errors/business-erros';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('RestauranteService', () => {
  let service: RestauranteService;
  let repository: Repository<RestauranteEntity>;
  let restaurantesList: RestauranteEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RestauranteService],
    }).compile();

    service = module.get<RestauranteService>(RestauranteService);
    repository = module.get<Repository<RestauranteEntity>>(
      getRepositoryToken(RestauranteEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    restaurantesList = [];
    for (let i = 0; i < 5; i++) {
      const restaurante = new RestauranteEntity();
      restaurante.nombre = `Restaurante ${i}`;
      restaurante.direccion = `Dirección ${i}`;
      restaurante.tipoCocina = TipoCocina.ITALIANA;
      restaurante.paginaWeb = `www.restaurante${i}.com`;
      restaurantesList.push(await repository.save(restaurante));
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new restaurante', async () => {
    const restaurante = new RestauranteEntity();
    restaurante.nombre = 'Restaurante Test';
    restaurante.direccion = 'Dirección Test';
    restaurante.tipoCocina = TipoCocina.ITALIANA;
    restaurante.paginaWeb = 'www.restauranteTest.com';

    const result = await service.create(restaurante);
    expect(result).toMatchObject(restaurante);
  });

  it('should throw an exception for invalid cocina type', async () => {
    const restaurante = new RestauranteEntity();
    restaurante.nombre = 'Restaurante Test';
    restaurante.direccion = 'Dirección Test';
    restaurante.tipoCocina = 'INVALID' as TipoCocina;
    restaurante.paginaWeb = 'www.restauranteTest.com';

    await expect(service.create(restaurante)).rejects.toThrow(
      BusinessLogicException,
    );
  });

  it('should return all restaurantes', async () => {
    const result = await service.findAll();
    expect(result).toHaveLength(restaurantesList.length);
  });

  it('should return a restaurante by id', async () => {
    const result = await service.findOne(restaurantesList[0].id);
    expect(result).toMatchObject(restaurantesList[0]);
  });

  it('should throw an exception for an invalid id', async () => {
    await expect(service.findOne('invalid-id')).rejects.toThrow(
      BusinessLogicException,
    );
  });

  it('should update a restaurante', async () => {
    const restaurante = restaurantesList[0];
    restaurante.nombre = 'Restaurante Updated';
    const result = await service.update(restaurante.id, restaurante);
    expect(result).toMatchObject(restaurante);
  });

  it('should throw an exception for an invalid id on update', async () => {
    const restaurante = restaurantesList[0];
    await expect(service.update('invalid-id', restaurante)).rejects.toThrow(
      BusinessLogicException,
    );
  });

  it('should delete a restaurante', async () => {
    const restaurante = restaurantesList[0];
    await service.remove(restaurante.id);
    await expect(service.findOne(restaurante.id)).rejects.toThrow(
      BusinessLogicException,
    );
  });

  it('should throw an exception for an invalid id on delete', async () => {
    await expect(service.remove('invalid-id')).rejects.toThrow(
      BusinessLogicException,
    );
  });

  it('should throw an exception for an invalid cocina type on update', async () => {
    const restaurante = restaurantesList[0];
    restaurante.tipoCocina = 'INVALID' as TipoCocina;
    await expect(service.update(restaurante.id, restaurante)).rejects.toThrow(
      BusinessLogicException,
    );
  });
});
