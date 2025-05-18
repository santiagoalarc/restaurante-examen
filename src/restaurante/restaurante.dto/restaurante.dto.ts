/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsArray,
} from 'class-validator';

export class RestauranteDto {
  @IsOptional()
  @IsNumber()
  readonly id?: number;

  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  readonly tipoCocina: string;

  @IsNotEmpty()
  @IsString()
  readonly direccion: string;

  @IsNotEmpty()
  @IsString()
  readonly paginaWeb: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly platos: string[];
}
