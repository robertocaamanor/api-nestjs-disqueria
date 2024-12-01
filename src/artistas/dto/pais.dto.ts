import { ApiProperty } from '@nestjs/swagger';

export class PaisDto {
  @ApiProperty({ example: 2 })
  id: number;

  @ApiProperty({ example: 'Estados Unidos' })
  nombre: string;
}
