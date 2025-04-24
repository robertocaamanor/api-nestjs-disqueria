import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
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

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un disco' })
  @ApiResponse({ status: 200, description: 'El disco ha sido actualizado.', type: Disco })
  @ApiResponse({ status: 404, description: 'Disco no encontrado.' })
  async update(@Param('id') id: number, @Body() updateDiscoDto: Partial<CreateDiscoDto>): Promise<Disco> {
    return this.discosService.update(id, updateDiscoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un disco' })
  @ApiResponse({ status: 200, description: 'El disco ha sido eliminado.' })
  @ApiResponse({ status: 404, description: 'Disco no encontrado.' })
  async delete(@Param('id') id: number): Promise<void> {
    return this.discosService.delete(id);
  }
}