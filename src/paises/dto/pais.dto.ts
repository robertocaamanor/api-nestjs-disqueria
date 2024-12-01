import { ApiProperty } from '@nestjs/swagger';

export class PaisDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Argentina' })
  nombre: string;
}