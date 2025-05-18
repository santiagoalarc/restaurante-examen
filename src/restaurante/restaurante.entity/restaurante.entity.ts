/* eslint-disable prettier/prettier */
import { Column, Double, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlatoEntity } from 'src/plato/plato.entity/plato.entity';

@Entity()
export class RestauranteEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    descripción: string;

    @Column()
    precio: Double;

    @Column()
    categoria: string;

    @ManyToMany(() => PlatoEntity, plato => plato.restaurantes)
    platos: PlatoEntity[];

}
