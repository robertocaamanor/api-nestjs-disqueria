import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pais } from '../paises/pais.entity';
import { Artista } from '../artistas/artista.entity';

@Entity()
export class Disco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  anio: number;

  @ManyToOne(() => Pais, pais => pais.id)
  @JoinColumn({ name: 'paisId' })
  pais: Pais;

  @ManyToOne(() => Artista, artista => artista.id)
  @JoinColumn({ name: 'artistaId' })
  artista: Artista;
}