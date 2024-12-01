import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pais } from './pais.entity';

@Injectable()
export class PaisesService {
  constructor(
    @InjectRepository(Pais)
    private readonly paisRepository: Repository<Pais>,
  ) {}

  create(nombre: string): Promise<Pais> {
    const pais = this.paisRepository.create({ nombre });
    return this.paisRepository.save(pais);
  }

  findAll(): Promise<Pais[]> {
    return this.paisRepository.find();
  }

  findById(id: number): Promise<Pais> {
    return this.paisRepository.findOne({ where: { id } });
  }
}
