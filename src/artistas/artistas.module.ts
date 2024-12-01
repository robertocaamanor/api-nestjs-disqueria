// artistas.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistasController } from './artistas.controller';
import { ArtistasService } from './artistas.service';
import { Artista } from './artista.entity';
import { Pais } from '../paises/pais.entity';  // Asegúrate de incluir la entidad Pais

@Module({
  imports: [TypeOrmModule.forFeature([Artista, Pais])],  // Registrar las entidades en el módulo
  controllers: [ArtistasController],
  providers: [ArtistasService],  // Asegurarte de que el servicio esté en providers
})
export class ArtistasModule {}
