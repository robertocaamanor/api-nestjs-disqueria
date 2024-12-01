import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artista } from './artistas/artista.entity';
import { Pais } from './paises/pais.entity';
import { ArtistasModule } from './artistas/artistas.module';
import { PaisesModule } from './paises/paises.module';
import { AuthModule } from './auth/auth.module'; // Importa el módulo de autenticación

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USER || 'admin',
      password: process.env.POSTGRES_PASSWORD || 'admin123',
      database: process.env.POSTGRES_DB || 'disqueria',
      entities: [Artista, Pais],
      synchronize: true,
    }),
    ArtistasModule,
    PaisesModule,
    AuthModule, // Añade el módulo de autenticación
  ],
})
export class AppModule {}