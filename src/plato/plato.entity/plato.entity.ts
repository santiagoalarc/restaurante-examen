/* eslint-disable prettier/prettier */
import { RestauranteEntity } from '../../restaurante/restaurante.entity/restaurante.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum CategoriaPlato {
    ENTRADA = 'entrada',
    PLATO_FUERTE = 'plato fuerte',
    POSTRE = 'postre',
    BEBIDA = 'bebida'
}

@Entity()
export class PlatoEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column('float')
    precio: number;

    @Column({
        type: 'text',
        enum: CategoriaPlato
    })
    categoria: CategoriaPlato;


    @ManyToMany(() => RestauranteEntity, restaurante => restaurante.platos)
    restaurantes: RestauranteEntity[];

}