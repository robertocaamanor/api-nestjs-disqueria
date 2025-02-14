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
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'transacciones_db',
      entities: [Artista, Pais],
      synchronize: true,
    }),
    ArtistasModule,
    PaisesModule,
    AuthModule, // Añade el módulo de autenticación
  ],
})
export class AppModule {}