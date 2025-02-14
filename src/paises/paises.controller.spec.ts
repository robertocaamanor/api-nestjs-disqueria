import { Test, TestingModule } from '@nestjs/testing';
import { PaisesController } from './paises.controller';
import { PaisesService } from './paises.service';
import { Pais } from './pais.entity'; // Import the Pais type

describe('PaisesController', () => {
  let controller: PaisesController;
  let service: PaisesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaisesController],
      providers: [
        PaisesService,
        {
          provide: 'PaisRepository',
          useValue: {
            // mock implementation of PaisRepository methods if needed
          },
        },
      ],
    }).compile();

    controller = module.get<PaisesController>(PaisesController);
    service = module.get<PaisesService>(PaisesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of paises', async () => {
    const result: Pais[] = [{
      id: 0,
      nombre: '',
      artistas: []
    }];
    jest.spyOn(service, 'findAll').mockImplementation(async () => result);

    expect(await controller.findAll()).toBe(result);
  });
});