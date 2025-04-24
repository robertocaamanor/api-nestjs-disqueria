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
}