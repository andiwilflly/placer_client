import { Controller, Param, Body, Get, Delete, Post } from '@nestjs/common';
import { PlacesService } from './places.service';
import { IExploreParams, IScanParams, IPlace, IPlaceDoc } from './places.types';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post('explore')
  async explore(@Body() exploreParams: IExploreParams): Promise<IPlace[]> {
    return await this.placesService.explore(exploreParams);
  }

  @Post('scan')
  async scan(@Body() scanParams: IScanParams): Promise<IPlace[]> {
    return await this.placesService.scan(scanParams);
  }

  @Get()
  async all(): Promise<IPlaceDoc[]> {
    return await this.placesService.all();
  }

  @Post()
  async create(@Body() place: IPlace): Promise<IPlaceDoc> {
    return await this.placesService.create(place);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IPlaceDoc> {
    return await this.placesService.delete(id);
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<IPlaceDoc> {
    return await this.placesService.find(id);
  }

  @Delete()
  async deleteAll(
    @Param('filters') filters: { [key: string]: string },
  ): Promise<{ ok?: number; n?: number }> {
    return await this.placesService.deleteAll(filters);
  }
}
