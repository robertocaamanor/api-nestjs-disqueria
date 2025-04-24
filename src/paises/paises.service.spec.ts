import { Test, TestingModule } from '@nestjs/testing';
import { PaisesService } from './paises.service';
import { Pais } from './pais.entity';

describe('PaisesService', () => {
  let service: PaisesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaisesService,
        {
          provide: 'PaisRepository',
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PaisesService>(PaisesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of paises', async () => {
    const result = ['test'] as any as Pais[];
    jest.spyOn(service, 'findAll').mockImplementation(() => Promise.resolve(result));

    expect(await service.findAll()).toBe(result);
  });

  it('should add a new pais', async () => {
    const newPais = { id: 1, nombre: 'Argentina' } as Pais;
    jest.spyOn(service, 'create').mockImplementation(() => Promise.resolve(newPais));

    expect(await service.create('Argentina')).toBe(newPais);
  });

  it('should return a pais by id', async () => {
    const pais = { id: 1, nombre: 'Argentina' } as Pais;
    jest.spyOn(service, 'findById').mockImplementation(() => Promise.resolve(pais));

    expect(await service.findById(1)).toBe(pais);
  });

  it('should update a pais', async () => {
    const updatedPais = { id: 1, nombre: 'Brasil' } as Pais;
    jest.spyOn(service, 'create').mockImplementation(() => Promise.resolve(updatedPais));

    expect(await service.create('Brasil')).toBe(updatedPais);
  });
});