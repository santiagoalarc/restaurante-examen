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
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { RestauranteService } from './restaurante.service';
import { RestauranteEntity } from './restaurante.entity/restaurante.entity';

@Controller('restaurants')
@UseInterceptors(BusinessErrorsInterceptor)
export class RestauranteController {
  constructor(private readonly restauranteService: RestauranteService) {}

  @Get()
  async findAll() {
    return await this.restauranteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') restauranteId: string) {
    return await this.restauranteService.findOne(restauranteId);
  }

  @Post()
  async create(@Body() restaurante: RestauranteEntity) {
    return await this.restauranteService.create(restaurante);
  }

  @Put(':id')
  async update(
    @Param('id') restauranteId: string,
    @Body() restaurante: RestauranteEntity,
  ) {
    return await this.restauranteService.update(restauranteId, restaurante);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') restauranteId: string) {
    return await this.restauranteService.remove(restauranteId);
  }
}
