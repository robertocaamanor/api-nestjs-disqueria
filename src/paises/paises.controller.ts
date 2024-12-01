import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { PaisesService } from './paises.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePaisDto } from './dto/create-pais.dto';
import { PaisDto } from './dto/pais.dto';

@ApiTags('paises')
@Controller('paises')
export class PaisesController {
  constructor(private readonly paisesService: PaisesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo país' })
  @ApiResponse({ status: 201, description: 'El país ha sido creado.', type: PaisDto })
  create(@Body() createPaisDto: CreatePaisDto): Promise<PaisDto> {
    return this.paisesService.create(createPaisDto.nombre);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todos los países' })
  @ApiResponse({ status: 200, description: 'Lista de países.', type: [PaisDto] })
  findAll(): Promise<PaisDto[]> {
    return this.paisesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener un país por ID' })
  @ApiResponse({ status: 200, description: 'El país ha sido encontrado.', type: PaisDto })
  findById(@Param('id') id: number): Promise<PaisDto> {
    return this.paisesService.findById(id);
  }
}