import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artista } from './artistas/artista.entity';
import { Pais } from './paises/pais.entity';
import { Disco } from './discos/disco.entity'; // Importa la entidad Disco
import { ArtistasModule } from './artistas/artistas.module';
import { PaisesModule } from './paises/paises.module';
import { DiscosModule } from './discos/discos.module'; // Importa el módulo de discos
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
      entities: [Artista, Pais, Disco],
      synchronize: true,
    }),
    ArtistasModule,
    PaisesModule,
    DiscosModule,
    AuthModule, // Añade el módulo de autenticación
  ],
})
export class AppModule {}