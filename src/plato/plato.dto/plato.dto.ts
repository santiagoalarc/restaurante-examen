/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsArray,
} from 'class-validator';

export class PlatoDto {
  @IsOptional()
  @IsNumber()
  readonly id?: number;

  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  readonly descripcion: string;

  @IsNotEmpty()
  @IsString()
  readonly precio: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly restaurantes: string[];
}
