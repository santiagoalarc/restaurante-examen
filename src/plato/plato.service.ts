/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PlatoEntity, CategoriaPlato } from './plato.entity/plato.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-erros';

@Injectable()
export class PlatoService {
    constructor(
        @InjectRepository(PlatoEntity)
        private readonly platoRepository: Repository<PlatoEntity>,
    ) {}

    async create(plato: PlatoEntity): Promise<PlatoEntity> {
        const categoriasValidas = Object.values(CategoriaPlato);
        if (!categoriasValidas.includes(plato.categoria)) {
            throw new BusinessLogicException(`La categoría '${plato.categoria}' no es válida.`, BusinessError.BAD_REQUEST);
        }
        if (plato.precio <= 0) {
            throw new BusinessLogicException(`El precio '${plato.precio}' no es válido.`, BusinessError.BAD_REQUEST);
        }
        return this.platoRepository.save(plato);
    }

    async findAll(): Promise<PlatoEntity[]> {
        return this.platoRepository.find();
    }

    async findOne(id: string): Promise<PlatoEntity> {
        const plato = await this.platoRepository.findOne({ where: { id } });
        if (!plato) {
            throw new BusinessLogicException(`El plato con id ${id} no fue encontrado`, BusinessError.NOT_FOUND);
        }
        return plato;
    }

    async update(id: string, plato: PlatoEntity): Promise<PlatoEntity> {
        const categoriasValidas = Object.values(CategoriaPlato);
        const existingPlato = await this.platoRepository.findOne({where: {id}});
        if (!existingPlato) {
            throw new BusinessLogicException(`El plato con id ${id} no fue encontrado`, BusinessError.NOT_FOUND);
        }
        if (!categoriasValidas.includes(plato.categoria)) {
            throw new BusinessLogicException(`La categoría '${plato.categoria}' no es válida.`, BusinessError.BAD_REQUEST);
        }
        if (plato.precio <= 0) {
            throw new BusinessLogicException(`El precio '${plato.precio}' no es válido.`, BusinessError.BAD_REQUEST);
        }
        await this.platoRepository.update(id, plato);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        const plato = await this.findOne(id);
        if (!plato) {
            throw new BusinessLogicException(`El plato con id ${id} no fue encontrado`, BusinessError.NOT_FOUND);
        }
        await this.platoRepository.remove(plato);
    }
}