import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { ArtistasService } from './artistas.service';
import { Artista } from './artista.entity';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { ArtistaDto } from './dto/artista.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('artistas')
@Controller('artistas')
export class ArtistasController {
  constructor(private readonly artistasService: ArtistasService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo artista' })
  @ApiResponse({
    status: 201,
    description: 'El artista ha sido creado.',
    type: ArtistaDto,
  })
  async create(@Body() createArtistaDto: CreateArtistaDto): Promise<Artista> {
    return this.artistasService.create(
      createArtistaDto,
      createArtistaDto.paisId,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todos los artistas' })
  @ApiResponse({ status: 200, description: 'Lista de artistas.', type: [ArtistaDto] })
  findAll(): Promise<Artista[]> {
    return this.artistasService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener un artista por ID' })
  @ApiResponse({ status: 200, description: 'El artista ha sido encontrado.', type: ArtistaDto })
  async findById(@Param('id') id: number): Promise<ArtistaDto> {
    const artista = await this.artistasService.findById(id);
    return {
      ...artista,
      pais: {
        id: artista.pais.id,
        nombre: artista.pais.nombre,
      },
      nacimiento: artista.nacimiento.toISOString(),
      fecha_creacion: artista.fecha_creacion.toISOString(),
      fecha_modificacion: artista.fecha_modificacion.toISOString(),
    };
  }
}