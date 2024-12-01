// pais.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Artista } from '../artistas/artista.entity';  // Importa la entidad Artista

@Entity()
export class Pais {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Artista, artista => artista.pais)
  artistas: Artista[];
}
