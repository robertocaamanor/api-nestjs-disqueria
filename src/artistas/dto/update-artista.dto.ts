import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateArtistaDto } from './create-artista.dto';
import { IsInt, IsOptional, IsDateString } from 'class-validator';

export class UpdateArtistaDto extends PartialType(CreateArtistaDto) {
  @ApiProperty({ example: 1, required: false })
  @IsInt()
  @IsOptional()
  paisId?: number;

  @ApiProperty({ example: '2024-12-01T02:50:42.440Z', required: false })
  @IsDateString()
  @IsOptional()
  fecha_modificacion?: string;
}