import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IExploreParams, IPlace, IPlaceDoc, IScanParams } from './places.types';
import { HttpService } from '@nestjs/axios';
import getPlacesExplore from './methods/getPlacesExplore.method';
import scanPlacesAround from './methods/scanPlacesAround.method';
import { InjectPage, InjectBrowser } from 'nest-puppeteer';
import { Page, Browser } from 'puppeteer';

@Injectable()
export class PlacesService {
  private readonly logger = new Logger(PlacesService.name);

  constructor(
    @InjectModel('Place') private placesModel: Model<IPlace>,
    @InjectBrowser() private readonly browser: Browser,
    @InjectPage() private readonly page: Page,
    private httpService: HttpService,
  ) {}

  async explore(exploreParams: IExploreParams): Promise<IPlace[]> {
    return getPlacesExplore({
      browser: this.browser,
      placesModel: this.placesModel,
      exploreParams,
    });
  }

  async scan(scanParams: IScanParams): Promise<any> {
    return await scanPlacesAround(scanParams);
  }

  async all(): Promise<IPlaceDoc[]> {
    return await this.placesModel.find().exec();
  }

  async create(board: IPlace): Promise<IPlaceDoc> {
    return await this.placesModel.create(board);
  }

  async delete(id: string): Promise<IPlaceDoc> {
    return await this.placesModel.findByIdAndDelete(id).exec();
  }

  async find(id: string) {
    return await this.placesModel.findById(id).exec();
  }

  async deleteAll(
    filters: { [key: string]: string } = {},
  ): Promise<{ ok?: number; n?: number }> {
    return await this.placesModel.deleteMany(filters).exec();
  }
}
