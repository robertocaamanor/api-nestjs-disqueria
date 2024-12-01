import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePaisDto {
  @ApiProperty({ example: 'Argentina' })
  @IsString()
  nombre: string;
}