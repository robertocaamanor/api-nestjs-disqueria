import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateArtistaDto } from './create-artista.dto';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateArtistaDto extends PartialType(CreateArtistaDto) {
  @ApiProperty({ example: 1, required: false })
  @IsInt()
  @IsOptional()
  paisId?: number;
}