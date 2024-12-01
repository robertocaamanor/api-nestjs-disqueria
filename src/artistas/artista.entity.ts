// artista.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pais } from '../paises/pais.entity';  // Importa la entidad Pais

@Entity()
export class Artista {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  nacimiento: Date;

  @Column()
  anio_debut: number;

  @ManyToOne(() => Pais, pais => pais.artistas)
  @JoinColumn({ name: 'paisId' })  // Relación con la entidad Pais
  pais: Pais;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_modificacion: Date;
}
