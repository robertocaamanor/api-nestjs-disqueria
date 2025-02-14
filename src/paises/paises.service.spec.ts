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
});