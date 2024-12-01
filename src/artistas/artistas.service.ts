import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Artista } from './artista.entity';
import { Pais } from '../paises/pais.entity';  // Asegúrate de que la entidad Pais esté importada
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';  // Importa el DTO para actualizar

@Injectable()
export class ArtistasService {
  constructor(
    @InjectRepository(Artista)
    private readonly artistaRepository: Repository<Artista>,

    @InjectRepository(Pais)  // Inyectamos el repositorio de Pais
    private readonly paisRepository: Repository<Pais>,  

    private readonly dataSource: DataSource, // Para ejecutar consultas manuales
  ) {}

  // Método para crear un nuevo artista
  async create(createArtistaDto: CreateArtistaDto, paisId: number): Promise<Artista> {
    const pais = await this.paisRepository.findOneBy({ id: paisId });

    if (!pais) {
      throw new Error(`Pais con ID ${paisId} no encontrado`);
    }

    const newArtista = this.artistaRepository.create({
      ...createArtistaDto,
      pais,  // Asociamos el país al artista
    });

    return this.artistaRepository.save(newArtista);
  }

  // Método para obtener todos los artistas
  async findAll(): Promise<Artista[]> {
    return this.artistaRepository.find({ relations: ['pais'] });  // Cargar la relación con la entidad Pais
  }

  // Método para obtener un artista por ID
  async findById(id: number): Promise<Artista> {
    const artista = await this.artistaRepository.findOne({ where: { id }, relations: ['pais'] });
    if (!artista) {
      throw new NotFoundException(`Artista con ID ${id} no encontrado`);
    }
    return artista;
  }

  // Método para actualizar un artista
  async update(id: number, updateArtistaDto: UpdateArtistaDto): Promise<Artista> {
    const artista = await this.artistaRepository.findOne({ where: { id }, relations: ['pais'] });
    if (!artista) {
      throw new NotFoundException(`Artista con ID ${id} no encontrado`);
    }

    if (updateArtistaDto.paisId) {
      const pais = await this.paisRepository.findOneBy({ id: updateArtistaDto.paisId });
      if (!pais) {
        throw new Error(`Pais con ID ${updateArtistaDto.paisId} no encontrado`);
      }
      artista.pais = pais;
    }

    Object.assign(artista, updateArtistaDto);
    artista.fecha_modificacion = new Date();  // Actualiza la fecha de modificación
    return this.artistaRepository.save(artista);
  }

  // Método para eliminar un artista
  async delete(id: number): Promise<void> {
    const artista = await this.artistaRepository.findOne({ where: { id } });
    if (!artista) {
      throw new NotFoundException(`Artista con ID ${id} no encontrado`);
    }
    await this.artistaRepository.remove(artista);
  }

  // Verifica si las tablas existen y las crea si no es así
  async ensureTablesExist(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    // Verificar si la tabla 'artistas' existe
    const artistasTableExists = await queryRunner.hasTable('artistas');
    if (!artistasTableExists) {
      console.log('La tabla "artistas" no existe. Creándola...');
      await queryRunner.query(`
        CREATE TABLE artistas (
          id SERIAL PRIMARY KEY,
          nombre VARCHAR(100) NOT NULL,
          nacimiento DATE NOT NULL,
          anio_debut INT NOT NULL,
          fecha_creacion TIMESTAMP DEFAULT now(),
          fecha_modificacion TIMESTAMP DEFAULT now(),
          paisId INT NOT NULL,
          FOREIGN KEY (paisId) REFERENCES paises(id)
        )
      `);
    }

    // Verificar si la tabla 'paises' existe
    const paisesTableExists = await queryRunner.hasTable('paises');
    if (!paisesTableExists) {
      console.log('La tabla "paises" no existe. Creándola...');
      await queryRunner.query(`
        CREATE TABLE paises (
          id SERIAL PRIMARY KEY,
          nombre VARCHAR(100) NOT NULL
        )
      `);
    }

    await queryRunner.release();
  }
}