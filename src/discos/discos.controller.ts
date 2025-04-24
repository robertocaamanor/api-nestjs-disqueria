import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { DiscosService } from './discos.service';
import { CreateDiscoDto } from './dto/create-disco.dto';
import { Disco } from './disco.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('discos')
@Controller('discos')
export class DiscosController {
  constructor(private readonly discosService: DiscosService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo disco' })
  @ApiResponse({ status: 201, description: 'El disco ha sido creado.', type: Disco })
  async create(@Body() createDiscoDto: CreateDiscoDto): Promise<Disco> {
    return this.discosService.create(createDiscoDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todos los discos' })
  @ApiResponse({ status: 200, description: 'Lista de discos.', type: [Disco] })
  async findAll(): Promise<Disco[]> {
    return this.discosService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener un disco por ID' })
  @ApiResponse({ status: 200, description: 'El disco ha sido encontrado.', type: Disco })
  @ApiResponse({ status: 404, description: 'Disco no encontrado.' })
  async findById(@Param('id') id: number): Promise<Disco> {
    return this.discosService.findById(id);
  }
}