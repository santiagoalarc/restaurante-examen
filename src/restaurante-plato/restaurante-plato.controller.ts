import {
  Controller,
  Delete,
  Get,
  Put,
  Body,
  HttpCode,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { RestaurantePlatoService } from './restaurante-plato.service';
import { PlatoDto } from 'src/plato/plato.dto/plato.dto';
import { plainToInstance } from 'class-transformer';
import { PlatoEntity } from 'src/plato/plato.entity/plato.entity';

@Controller('restaurants')
@UseInterceptors(BusinessErrorsInterceptor)
export class RestaurantePlatoController {
  constructor(
    private readonly restaurantePlatoService: RestaurantePlatoService,
  ) {}

  @Post(':restauranteId/dishes/:platoId')
  async addPlatoToRestaurante(
    @Param('restauranteId') restauranteId: string,
    @Param('platoId') platoId: string,
  ) {
    return await this.restaurantePlatoService.addPlatoToRestaurante(
      restauranteId,
      platoId,
    );
  }

  @Get(':restauranteId/dishes')
  async findPlatosFromRestaurante(
    @Param('restauranteId') restauranteId: string,
  ) {
    return await this.restaurantePlatoService.findPlatosFromRestaurante(
      restauranteId,
    );
  }

  @Get(':restauranteId/dishes/:platoId')
  async findPlatoFromRestaurante(
    @Param('restauranteId') restauranteId: string,
    @Param('platoId') platoId: string,
  ) {
    return await this.restaurantePlatoService.findPlatoFromRestaurante(
      restauranteId,
      platoId,
    );
  }

  @Put(':restauranteId/dishes')
  async updatePlatosFromRestaurante(
    @Param('restauranteId') restauranteId: string,
    @Body() platosDto: PlatoDto[],
  ) {
    const platos = platosDto.map((platoDto) => {
      return plainToInstance(PlatoEntity, platoDto);
    });
    return await this.restaurantePlatoService.updatePlatosFromRestaurante(
      restauranteId,
      platos,
    );
  }

  @Delete(':restauranteId/dishes/:platoId')
  @HttpCode(204)
  async deletePlatoFromRestaurante(
    @Param('restauranteId') restauranteId: string,
    @Param('platoId') platoId: string,
  ) {
    return await this.restaurantePlatoService.deletePlatoFromRestaurante(
      restauranteId,
      platoId,
    );
  }
}
