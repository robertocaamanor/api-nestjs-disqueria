import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscosController } from './discos.controller';
import { DiscosService } from './discos.service';
import { Disco } from './disco.entity';
import { Pais } from '../paises/pais.entity';
import { Artista } from '../artistas/artista.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Disco, Pais, Artista])],
  controllers: [DiscosController],
  providers: [DiscosService],
})
export class DiscosModule {}