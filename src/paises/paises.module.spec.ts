import { Test, TestingModule } from '@nestjs/testing';
import { PaisesModule } from './paises.module';
import { PaisesService } from './paises.service';
import { PaisesController } from './paises.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pais } from './pais.entity';
import { Artista } from '../artistas/artista.entity'; // Importa la entidad Artista
import { DataSource } from 'typeorm';

describe('PaisesModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres', // o el tipo de base de datos que estés usando
          host: 'localhost',
          port: 5432,
          username: 'user',
          password: 'password',
          database: 'transacciones_db',
          entities: [Pais, Artista], // Agrega la entidad Artista
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Pais, Artista]), // Agrega la entidad Artista
        PaisesModule,
      ]
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have PaisesService', () => {
    const service = module.get<PaisesService>(PaisesService);
    expect(service).toBeDefined();
  });

  it('should have PaisesController', () => {
    const controller = module.get<PaisesController>(PaisesController);
    expect(controller).toBeDefined();
  });
});