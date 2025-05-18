import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  RestauranteEntity,
  TipoCocina,
} from './restaurante.entity/restaurante.entity';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-erros';

@Injectable()
export class RestauranteService {
  constructor(
    @InjectRepository(RestauranteEntity)
    private readonly restauranteRepository: Repository<RestauranteEntity>,
  ) {}

  async create(restaurante: RestauranteEntity): Promise<RestauranteEntity> {
    const tipoCocina = Object.values(TipoCocina);
    if (!tipoCocina.includes(restaurante.tipoCocina)) {
      throw new BusinessLogicException(
        `El tipo de cocina '${restaurante.tipoCocina}' no es válida.`,
        BusinessError.BAD_REQUEST,
      );
    }
    return this.restauranteRepository.save(restaurante);
  }

  async findAll(): Promise<RestauranteEntity[]> {
    return this.restauranteRepository.find();
  }

  async findOne(id: string): Promise<RestauranteEntity> {
    const restaurante = await this.restauranteRepository.findOne({
      where: { id },
    });
    if (!restaurante) {
      throw new BusinessLogicException(
        `El restaurante con id ${id} no fue encontrado`,
        BusinessError.NOT_FOUND,
      );
    }
    return restaurante;
  }

  async update(
    id: string,
    restaurante: RestauranteEntity,
  ): Promise<RestauranteEntity> {
    const existingRestaurante = await this.findOne(id);
    if (!existingRestaurante) {
      throw new BusinessLogicException(
        `El restaurante con id ${id} no fue encontrado`,
        BusinessError.NOT_FOUND,
      );
    }
    const tipoCocina = Object.values(TipoCocina);
    if (!tipoCocina.includes(restaurante.tipoCocina)) {
      throw new BusinessLogicException(
        `La categoría '${restaurante.tipoCocina}' no es válida.`,
        BusinessError.BAD_REQUEST,
      );
    }
    await this.restauranteRepository.update(id, restaurante);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const restaurante = await this.findOne(id);
    if (!restaurante) {
      throw new BusinessLogicException(
        `El restaurante con id ${id} no fue encontrado`,
        BusinessError.NOT_FOUND,
      );
    }
    await this.restauranteRepository.remove(restaurante);
  }
}
