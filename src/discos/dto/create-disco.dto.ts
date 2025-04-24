import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateDiscoDto {
  @ApiProperty({ example: 'Thriller' })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ example: 1982 })
  @IsInt()
  @IsNotEmpty()
  anio: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  paisId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  artistaId: number;
}