import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistasModule } from './artistas.module';
import { ArtistasService } from './artistas.service';
import { ArtistasController } from './artistas.controller';
import { Artista } from './artista.entity';
import { Pais } from '../paises/pais.entity';

describe('ArtistasModule', () => {
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
          entities: [Artista, Pais],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Artista, Pais]),
        ArtistasModule,
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have ArtistasService', () => {
    const service = module.get<ArtistasService>(ArtistasService);
    expect(service).toBeDefined();
  });

  it('should have ArtistasController', () => {
    const controller = module.get<ArtistasController>(ArtistasController);
    expect(controller).toBeDefined();
  });
});
