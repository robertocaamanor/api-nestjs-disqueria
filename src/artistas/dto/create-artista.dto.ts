import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsInt, IsNotEmpty, IsDefined } from 'class-validator';

export class CreateArtistaDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  nombre: string;

  @ApiProperty({ example: '1990-01-01' })
  @IsDateString()
  @IsNotEmpty()
  @IsDefined()
  nacimiento: Date;

  @ApiProperty({ example: 2010 })
  @IsInt()
  @IsNotEmpty()
  @IsDefined()
  anio_debut: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  @IsDefined()
  paisId: number;
}