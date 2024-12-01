import { IsString, IsDateString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateArtistaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsDateString()
  @IsNotEmpty()
  nacimiento: Date;

  @IsInt()
  @IsNotEmpty()
  anio_debut: number;

  @IsInt()
  @IsNotEmpty()
  paisId: number;  // ID del país relacionado

  @IsOptional()  // Si se desea que esta propiedad sea opcional
  @IsDateString()
  fecha_creacion?: Date;

  @IsOptional()  // Si se desea que esta propiedad sea opcional
  @IsDateString()
  fecha_modificacion?: Date;
}
