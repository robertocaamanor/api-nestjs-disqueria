import { Test, TestingModule } from '@nestjs/testing';
import { ArtistasController } from './artistas.controller';
import { ArtistasService } from './artistas.service';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';
import { Artista } from './artista.entity';

const mockArtista: Artista = {
  id: 1,
  nombre: 'Artista de prueba',
  pais: { id: 1, nombre: 'Pais de prueba' } as any,
  nacimiento: new Date('2023-01-01'),
  fecha_creacion: new Date('2023-01-01'),
  fecha_modificacion: new Date('2023-01-01'),
  anio_debut: 0
};

const mockArtistas: Artista[] = [mockArtista];

describe('ArtistasController', () => {
  let controller: ArtistasController;
  let service: ArtistasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistasController],
      providers: [
        {
          provide: ArtistasService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockArtista),
            findAll: jest.fn().mockResolvedValue(mockArtistas),
            findById: jest.fn().mockResolvedValue(mockArtista),
            update: jest.fn().mockResolvedValue(mockArtista),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<ArtistasController>(ArtistasController);
    service = module.get<ArtistasService>(ArtistasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new artista', async () => {
      const createArtistaDto: CreateArtistaDto = {
        nombre: 'Artista de prueba',
        paisId: 1,
        nacimiento: '2023-01-01',
      } as any;
      const result = await controller.create(createArtistaDto);
      expect(service.create).toHaveBeenCalledWith(createArtistaDto, createArtistaDto.paisId);
      expect(result).toEqual({
        ...mockArtista,
        pais: { id: mockArtista.pais.id, nombre: mockArtista.pais.nombre },
        nacimiento: mockArtista.nacimiento.toISOString(),
        fecha_creacion: mockArtista.fecha_creacion.toISOString(),
        fecha_modificacion: mockArtista.fecha_modificacion.toISOString(),
      });
    });
  });

  describe('findAll', () => {
    it('should return all artistas', async () => {
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(
        mockArtistas.map(artista => ({
          ...artista,
          pais: { id: artista.pais.id, nombre: artista.pais.nombre },
          nacimiento: new Date(artista.nacimiento).toISOString(),
          fecha_creacion: artista.fecha_creacion.toISOString(),
          fecha_modificacion: artista.fecha_modificacion.toISOString(),
        })),
      );
    });
  });

  describe('findById', () => {
    it('should return an artista by id', async () => {
      const result = await controller.findById(1);
      expect(service.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual({
        ...mockArtista,
        pais: { id: mockArtista.pais.id, nombre: mockArtista.pais.nombre },
        nacimiento: new Date(mockArtista.nacimiento).toISOString(),
        fecha_creacion: mockArtista.fecha_creacion.toISOString(),
        fecha_modificacion: mockArtista.fecha_modificacion.toISOString(),
      });
    });
  });

  describe('update', () => {
    it('should update an artista', async () => {
      const updateArtistaDto: UpdateArtistaDto = { nombre: 'Artista actualizado' } as any;
      const result = await controller.update(1, updateArtistaDto);
      expect(service.update).toHaveBeenCalledWith(1, updateArtistaDto);
      expect(result).toEqual({
        ...mockArtista,
        pais: { id: mockArtista.pais.id, nombre: mockArtista.pais.nombre },
        nacimiento: new Date(mockArtista.nacimiento).toISOString(),
        fecha_creacion: mockArtista.fecha_creacion.toISOString(),
        fecha_modificacion: mockArtista.fecha_modificacion.toISOString(),
      });
    });
  });

  describe('delete', () => {
    it('should delete an artista', async () => {
      await controller.delete(1);
      expect(service.delete).toHaveBeenCalledWith(1);
    });
  });
});