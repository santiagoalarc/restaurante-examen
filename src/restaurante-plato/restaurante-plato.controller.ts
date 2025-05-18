import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { RestaurantePlatoService } from './restaurante-plato.service';

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
