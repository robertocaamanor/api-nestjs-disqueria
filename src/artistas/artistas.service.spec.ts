import { Test, TestingModule } from '@nestjs/testing';
import { ArtistasService } from './artistas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Artista } from './artista.entity';
import { Pais } from '../paises/pais.entity';
import { Repository, DataSource } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';

// filepath: /c:/Users/Roberto Caamaño/Documents/NestJS/api-nestjs-disqueria/src/artistas/artistas.service.test.ts

const mockArtistaRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
};

const mockPaisRepository = {
  findOneBy: jest.fn(),
};

const mockDataSource = {};

describe('ArtistasService', () => {
  let service: ArtistasService;
  let artistaRepository: Repository<Artista>;
  let paisRepository: Repository<Pais>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistasService,
        { provide: getRepositoryToken(Artista), useValue: mockArtistaRepository },
        { provide: getRepositoryToken(Pais), useValue: mockPaisRepository },
        { provide: DataSource, useValue: mockDataSource },
      ],
    }).compile();

    service = module.get<ArtistasService>(ArtistasService);
    artistaRepository = module.get<Repository<Artista>>(getRepositoryToken(Artista)) as jest.Mocked<Repository<Artista>>;
    paisRepository = module.get<Repository<Pais>>(getRepositoryToken(Pais)) as jest.Mocked<Repository<Pais>>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new artista', async () => {
      const createArtistaDto: CreateArtistaDto = { nombre: 'Artista de prueba', paisId: 1, nacimiento: '2023-01-01' } as any;
      const pais = { id: 1, nombre: 'Pais de prueba' } as any;
      const newArtista = { ...createArtistaDto, pais } as any;

      (paisRepository.findOneBy as jest.Mock).mockResolvedValue(pais);
      (artistaRepository.create as jest.Mock).mockReturnValue(newArtista);
      (artistaRepository.save as jest.Mock).mockResolvedValue(newArtista);

      const result = await service.create(createArtistaDto, 1);
      expect(paisRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(artistaRepository.create).toHaveBeenCalledWith({ ...createArtistaDto, pais });
      expect(artistaRepository.save).toHaveBeenCalledWith(newArtista);
      expect(result).toEqual(newArtista);
    });

    it('should throw an error if pais not found', async () => {
      const createArtistaDto: CreateArtistaDto = { nombre: 'Artista de prueba', paisId: 1, nacimiento: '2023-01-01' } as any;

      (paisRepository.findOneBy as jest.Mock).mockResolvedValue(null);

      await expect(service.create(createArtistaDto, 1)).rejects.toThrowError('Pais con ID 1 no encontrado');
    });
  });

  describe('findAll', () => {
    it('should return all artistas', async () => {
      const artistas = [{ id: 1, nombre: 'Artista de prueba', pais: { id: 1, nombre: 'Pais de prueba' } } as any];
      (artistaRepository.find as jest.Mock).mockResolvedValue(artistas);

      const result = await service.findAll();
      expect(artistaRepository.find).toHaveBeenCalledWith({ relations: ['pais'] });
      expect(result).toEqual(artistas);
    });
  });

  describe('findById', () => {
    it('should return an artista by id', async () => {
      const artista = { id: 1, nombre: 'Artista de prueba', pais: { id: 1, nombre: 'Pais de prueba' } } as any;
      (artistaRepository.findOne as jest.Mock).mockResolvedValue(artista);

      const result = await service.findById(1);
      expect(artistaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['pais'] });
      expect(result).toEqual(artista);
    });

    it('should throw a NotFoundException if artista not found', async () => {
      (artistaRepository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.findById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an artista', async () => {
      const updateArtistaDto: UpdateArtistaDto = { nombre: 'Artista actualizado' } as any;
      const artista = { id: 1, nombre: 'Artista de prueba', pais: { id: 1, nombre: 'Pais de prueba' } } as any;
      const updatedArtista = { ...artista, ...updateArtistaDto, fecha_modificacion: new Date() };

      (artistaRepository.findOne as jest.Mock).mockResolvedValue(artista);
      (artistaRepository.save as jest.Mock).mockResolvedValue(updatedArtista);

      const result = await service.update(1, updateArtistaDto);
      expect(artistaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['pais'] });
      expect(artistaRepository.save).toHaveBeenCalledWith(updatedArtista);
      expect(result).toEqual(updatedArtista);
    });

    it('should throw a NotFoundException if artista not found', async () => {
      (artistaRepository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.update(1, { nombre: 'Artista actualizado' } as any)).rejects.toThrow(NotFoundException);
    });

    it('should throw an error if pais not found', async () => {
      const updateArtistaDto: UpdateArtistaDto = { nombre: 'Artista actualizado', paisId: 2 } as any;
      const artista = { id: 1, nombre: 'Artista de prueba', pais: { id: 1, nombre: 'Pais de prueba' } } as any;

      (artistaRepository.findOne as jest.Mock).mockResolvedValue(artista);
      (paisRepository.findOneBy as jest.Mock).mockResolvedValue(null);

      await expect(service.update(1, updateArtistaDto)).rejects.toThrowError('Pais con ID 2 no encontrado');
    });
  });

  describe('delete', () => {
    it('should delete an artista', async () => {
      const artista = { id: 1, nombre: 'Artista de prueba' } as any;

      (artistaRepository.findOne as jest.Mock).mockResolvedValue(artista);
      (artistaRepository.remove as jest.Mock).mockResolvedValue(undefined);

      await service.delete(1);
      expect(artistaRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(artistaRepository.remove).toHaveBeenCalledWith(artista);
    });

    it('should throw a NotFoundException if artista not found', async () => {
      (artistaRepository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.delete(1)).rejects.toThrow(NotFoundException);
    });
  });
});