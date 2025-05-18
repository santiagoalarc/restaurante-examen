import { Test, TestingModule } from '@nestjs/testing';
import { PlatoService } from './plato.service';
import { PlatoEntity, CategoriaPlato } from './plato.entity/plato.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BusinessLogicException,
  BusinessError,
} from '../shared/errors/business-erros';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('PlatoService', () => {
  let service: PlatoService;
  let repository: Repository<PlatoEntity>;
  let platosList: PlatoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PlatoService],
    }).compile();
    service = module.get<PlatoService>(PlatoService);
    repository = module.get<Repository<PlatoEntity>>(
      getRepositoryToken(PlatoEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    platosList = [];
    for (let i = 0; i < 5; i++) {
      const plato = new PlatoEntity();
      plato.nombre = `Plato ${i}`;
      plato.descripcion = `Descripción ${i}`;
      plato.precio = 10 + i;
      plato.categoria = CategoriaPlato.ENTRADA;
      platosList.push(await repository.save(plato));
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new plato', async () => {
    const plato = new PlatoEntity();
    plato.nombre = 'Plato Test';
    plato.descripcion = 'Descripción Test';
    plato.precio = 20;
    plato.categoria = CategoriaPlato.ENTRADA;

    const result = await service.create(plato);
    expect(result).toMatchObject(plato);
  });

  it('should throw an exception for invalid categoria type', async () => {
    const plato = new PlatoEntity();
    plato.nombre = 'Plato Test';
    plato.descripcion = 'Descripción Test';
    plato.precio = 20;
    plato.categoria = 'INVALID' as CategoriaPlato;

    await expect(service.create(plato)).rejects.toThrow(
      new BusinessLogicException(
        `La categoría '${plato.categoria}' no es válida.`,
        BusinessError.BAD_REQUEST,
      ),
    );
  });

  it('should throw an exception for invalid precio', async () => {
    const plato = new PlatoEntity();
    plato.nombre = 'Plato Test';
    plato.descripcion = 'Descripción Test';
    plato.precio = -10;
    plato.categoria = CategoriaPlato.ENTRADA;

    await expect(service.create(plato)).rejects.toThrow(
      new BusinessLogicException(
        `El precio '${plato.precio}' no es válido.`,
        BusinessError.BAD_REQUEST,
      ),
    );
  });

  it('should return all platos', async () => {
    const result = await service.findAll();
    expect(result).toHaveLength(platosList.length);
  });

  it('should return a plato by id', async () => {
    const result = await service.findOne(platosList[0].id);
    expect(result).toMatchObject(platosList[0]);
  });

  it('should throw an exception for an invalid id', async () => {
    await expect(service.findOne('invalid-id')).rejects.toThrow(
      new BusinessLogicException(
        `El plato con id invalid-id no fue encontrado`,
        BusinessError.NOT_FOUND,
      ),
    );
  });

  it('should update a plato', async () => {
    const plato = platosList[0];
    plato.nombre = 'Plato Updated';
    const result = await service.update(plato.id, plato);
    expect(result).toMatchObject(plato);
  });

  it('should throw an exception for an invalid id on update', async () => {
    const plato = platosList[0];
    await expect(service.update('invalid-id', plato)).rejects.toThrow(
      new BusinessLogicException(
        `El plato con id invalid-id no fue encontrado`,
        BusinessError.NOT_FOUND,
      ),
    );
  });

  it('should delete a plato', async () => {
    const plato = platosList[0];
    await service.remove(plato.id);
    await expect(service.findOne(plato.id)).rejects.toThrow(
      new BusinessLogicException(
        `El plato con id ${plato.id} no fue encontrado`,
        BusinessError.NOT_FOUND,
      ),
    );
  });

  it('should throw an exception for an invalid id on delete', async () => {
    await expect(service.remove('invalid-id')).rejects.toThrow(
      new BusinessLogicException(
        `El plato con id invalid-id no fue encontrado`,
        BusinessError.NOT_FOUND,
      ),
    );
  });

  it('should throw an exception for an invalid categoria type on update', async () => {
    const plato = platosList[0];
    plato.categoria = 'INVALID' as CategoriaPlato;
    await expect(service.update(plato.id, plato)).rejects.toThrow(
      new BusinessLogicException(
        `La categoría '${plato.categoria}' no es válida.`,
        BusinessError.BAD_REQUEST,
      ),
    );
  });
});
