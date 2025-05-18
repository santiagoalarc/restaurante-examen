/* eslint-disable prettier/prettier */
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlatoEntity } from 'src/plato/plato.entity/plato.entity';

export enum TipoCocina {
    ITALIANA = 'Italiana',
    MEXICANA = 'Mexicana',
    JAPONESA = 'Japonesa',
    COLOMBIANA = 'Colombiana',
    INDIA = 'India',
    INTERNACIONAL = 'Internacional',
}

@Entity()
export class RestauranteEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    direccion: string;

    @Column({
        type: 'enum',
        enum: TipoCocina
    })
    tipoCocina: TipoCocina;

    @Column()
    paginaWeb: string;

    @ManyToMany(() => PlatoEntity, plato => plato.restaurantes)
    @JoinTable()
    platos: PlatoEntity[];

}