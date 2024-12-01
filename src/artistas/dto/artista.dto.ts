import { ApiProperty } from '@nestjs/swagger';
import { PaisDto } from './pais.dto';

export class ArtistaDto {
  @ApiProperty({ example: 3 })
  id: number;

  @ApiProperty({ example: 'Britney Spears' })
  nombre: string;

  @ApiProperty({ example: '1981-12-02' })
  nacimiento: string;

  @ApiProperty({ example: 1998 })
  anio_debut: number;

  @ApiProperty({ type: PaisDto })
  pais: PaisDto;

  @ApiProperty({ example: '2024-12-01T02:50:42.440Z' })
  fecha_creacion: string;

  @ApiProperty({ example: '2024-12-01T02:50:42.440Z' })
  fecha_modificacion: string;
}