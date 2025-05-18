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

@Controller('restaurante-plato')
@UseInterceptors(BusinessErrorsInterceptor)
export class RestaurantePlatoController {
  constructor(
    private readonly restaurantePlatoService: RestaurantePlatoService,
  ) {}

  @Post(':restauranteId/plato/:platoId')
  async addPlatoToRestaurante(
    @Param('restauranteId') restauranteId: string,
    @Param('platoId') platoId: string,
  ) {
    return await this.restaurantePlatoService.addPlatoToRestaurante(
      restauranteId,
      platoId,
    );
  }

  @Get(':restauranteId/plato')
  async findPlatosFromRestaurante(
    @Param('restauranteId') restauranteId: string,
  ) {
    return await this.restaurantePlatoService.findPlatosFromRestaurante(
      restauranteId,
    );
  }

  @Get(':restauranteId/plato/:platoId')
  async findPlatoFromRestaurante(
    @Param('restauranteId') restauranteId: string,
    @Param('platoId') platoId: string,
  ) {
    return await this.restaurantePlatoService.findPlatoFromRestaurante(
      restauranteId,
      platoId,
    );
  }

  @Delete(':restauranteId/plato/:platoId')
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
