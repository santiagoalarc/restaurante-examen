import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlatoEntity } from '../plato/plato.entity/plato.entity';
import { RestauranteEntity } from '../restaurante/restaurante.entity/restaurante.entity';
import { Repository } from 'typeorm/repository/Repository';
import {
  BusinessLogicException,
  BusinessError,
} from '../shared/errors/business-erros';

@Injectable()
export class RestaurantePlatoService {
  constructor(
    @InjectRepository(RestauranteEntity)
    private readonly restauranteRepository: Repository<RestauranteEntity>,
    @InjectRepository(PlatoEntity)
    private readonly platoRepository: Repository<PlatoEntity>,
  ) {}

  async addPlatoToRestaurante(
    restauranteId: string,
    platoId: string,
  ): Promise<RestauranteEntity> {
    const restaurante = await this.restauranteRepository.findOne({
      where: { id: restauranteId },
      relations: ['platos'],
    });
    if (!restaurante) {
      throw new BusinessLogicException(
        `El restaurante con id ${restauranteId} no fue encontrado`,
        BusinessError.NOT_FOUND,
      );
    }

    const plato = await this.platoRepository.findOne({
      where: { id: platoId },
    });
    if (!plato) {
      throw new BusinessLogicException(
        `El plato con id ${platoId} no fue encontrado`,
        BusinessError.NOT_FOUND,
      );
    }

    restaurante.platos = [...restaurante.platos, plato];
    return this.restauranteRepository.save(restaurante);
  }

  async findPlatosFromRestaurante(
    restauranteId: string,
  ): Promise<PlatoEntity[]> {
    const restaurante = await this.restauranteRepository.findOne({
      where: { id: restauranteId },
      relations: ['platos'],
    });
    if (!restaurante) {
      throw new BusinessLogicException(
        `El restaurante con id ${restauranteId} no fue encontrado`,
        BusinessError.NOT_FOUND,
      );
    }
    return restaurante.platos;
  }

  async findPlatoFromRestaurante(
    restauranteId: string,
    platoId: string,
  ): Promise<PlatoEntity> {
    const restaurante = await this.restauranteRepository.findOne({
      where: { id: restauranteId },
      relations: ['platos'],
    });
    if (!restaurante) {
      throw new BusinessLogicException(
        `El restaurante con id ${restauranteId} no fue encontrado`,
        BusinessError.NOT_FOUND,
      );
    }

    const plato = await this.platoRepository.findOne({
      where: { id: platoId },
    });
    if (!plato) {
      throw new BusinessLogicException(
        `El plato con id ${platoId} no fue encontrado`,
        BusinessError.NOT_FOUND,
      );
    }

    const restaurantePlato = restaurante.platos.find((p) => p.id === plato.id);
    if (!restaurantePlato) {
      throw new BusinessLogicException(
        `El plato con id ${platoId} no está asociado al restaurante con id ${restauranteId}`,
        BusinessError.NOT_FOUND,
      );
    }
    return restaurantePlato;
  }

  async updatePlatoFromRestaurante(
    restauranteId: string,
    platoId: string,
    plato: PlatoEntity,
  ): Promise<RestauranteEntity> {
    const restaurante = await this.restauranteRepository.findOne({
      where: { id: restauranteId },
      relations: ['platos'],
    });
    if (!restaurante) {
      throw new BusinessLogicException(
        `El restaurante con id ${restauranteId} no fue encontrado`,
        BusinessError.NOT_FOUND,
      );
    }

    const platoToUpdate = await this.platoRepository.findOne({
      where: { id: platoId },
    });
    if (!platoToUpdate) {
      throw new BusinessLogicException(
        `El plato con id ${platoId} no fue encontrado`,
        BusinessError.NOT_FOUND,
      );
    }

    restaurante.platos = restaurante.platos.map((p) =>
      p.id === platoId ? plato : p,
    );
    return this.restauranteRepository.save(restaurante);
  }

  async deletePlatoFromRestaurante(
    restauranteId: string,
    platoId: string,
  ): Promise<RestauranteEntity> {
    const restaurante = await this.restauranteRepository.findOne({
      where: { id: restauranteId },
      relations: ['platos'],
    });
    if (!restaurante) {
      throw new BusinessLogicException(
        `El restaurante con id ${restauranteId} no fue encontrado`,
        BusinessError.NOT_FOUND,
      );
    }

    const plato = await this.platoRepository.findOne({
      where: { id: platoId },
    });
    if (!plato) {
      throw new BusinessLogicException(
        `El plato con id ${platoId} no fue encontrado`,
        BusinessError.NOT_FOUND,
      );
    }

    restaurante.platos = restaurante.platos.filter((p) => p.id !== platoId);
    return this.restauranteRepository.save(restaurante);
  }
}
