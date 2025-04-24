import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Disco } from './disco.entity';
import { Pais } from '../paises/pais.entity';
import { Artista } from '../artistas/artista.entity';
import { CreateDiscoDto } from './dto/create-disco.dto';

@Injectable()
export class DiscosService {
  constructor(
    @InjectRepository(Disco)
    private readonly discoRepository: Repository<Disco>,
    @InjectRepository(Pais)
    private readonly paisRepository: Repository<Pais>,
    @InjectRepository(Artista)
    private readonly artistaRepository: Repository<Artista>,
  ) {}

  async create(createDiscoDto: CreateDiscoDto): Promise<Disco> {
    const pais = await this.paisRepository.findOneBy({ id: createDiscoDto.paisId });
    if (!pais) {
      throw new NotFoundException(`Pais con ID ${createDiscoDto.paisId} no encontrado`);
    }

    const artista = await this.artistaRepository.findOneBy({ id: createDiscoDto.artistaId });
    if (!artista) {
      throw new NotFoundException(`Artista con ID ${createDiscoDto.artistaId} no encontrado`);
    }

    const disco = this.discoRepository.create({ ...createDiscoDto, pais, artista });
    return this.discoRepository.save(disco);
  }

  findAll(): Promise<Disco[]> {
    return this.discoRepository.find({ relations: ['pais', 'artista'] });
  }

  async findById(id: number): Promise<Disco> {
    const disco = await this.discoRepository.findOne({ where: { id }, relations: ['pais', 'artista'] });
    if (!disco) {
      throw new NotFoundException(`Disco con ID ${id} no encontrado`);
    }
    return disco;
  }

  async update(id: number, updateDiscoDto: Partial<CreateDiscoDto>): Promise<Disco> {
    const disco = await this.discoRepository.findOne({ where: { id }, relations: ['pais', 'artista'] });
    if (!disco) {
      throw new NotFoundException(`Disco con ID ${id} no encontrado`);
    }

    if (updateDiscoDto.paisId) {
      const pais = await this.paisRepository.findOneBy({ id: updateDiscoDto.paisId });
      if (!pais) {
        throw new NotFoundException(`Pais con ID ${updateDiscoDto.paisId} no encontrado`);
      }
      disco.pais = pais;
    }

    if (updateDiscoDto.artistaId) {
      const artista = await this.artistaRepository.findOneBy({ id: updateDiscoDto.artistaId });
      if (!artista) {
        throw new NotFoundException(`Artista con ID ${updateDiscoDto.artistaId} no encontrado`);
      }
      disco.artista = artista;
    }

    Object.assign(disco, updateDiscoDto);
    return this.discoRepository.save(disco);
  }

  async delete(id: number): Promise<void> {
    const disco = await this.discoRepository.findOne({ where: { id } });
    if (!disco) {
      throw new NotFoundException(`Disco con ID ${id} no encontrado`);
    }
    await this.discoRepository.remove(disco);
  }
}