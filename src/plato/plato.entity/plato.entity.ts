/* eslint-disable prettier/prettier */
import { RestauranteEntity } from 'src/restaurante/restaurante.entity/restaurante.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlatoEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    direccion: string;

    @Column()
    tipoCocina: string;

    @Column()
    paginaWeb: string;

    @ManyToMany(() => RestauranteEntity, restaurante => restaurante.platos)
    restaurantes: RestauranteEntity[];

}
