import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { PlatoService } from './plato.service';
import { PlatoEntity } from './plato.entity/plato.entity';
import { PlatoDto } from './plato.dto/plato.dto';
import { plainToInstance } from 'class-transformer';

@Controller('dishes')
@UseInterceptors(BusinessErrorsInterceptor)
export class PlatoController {
  constructor(private readonly platoService: PlatoService) {}

  @Get()
  async findAll() {
    return await this.platoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') platoId: string) {
    return await this.platoService.findOne(platoId);
  }

  @Post()
  async create(@Body() platoDto: PlatoDto) {
    const plato: PlatoEntity = plainToInstance(PlatoEntity, platoDto);
    return await this.platoService.create(plato);
  }

  @Put(':id')
  async update(@Param('id') platoId: string, @Body() platoDto: PlatoDto) {
    const plato: PlatoEntity = plainToInstance(PlatoEntity, platoDto);
    return await this.platoService.update(platoId, plato);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') platoId: string) {
    return await this.platoService.remove(platoId);
  }
}
