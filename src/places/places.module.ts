import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { PlaceSchema } from './places.schema';
import { HttpModule } from '@nestjs/axios';
import { PuppeteerModule } from 'nest-puppeteer';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Place', schema: PlaceSchema }]),
    HttpModule,
    PuppeteerModule.forRoot({
      pipe: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        // '--single-process', // <- this one doesn't works in Windows
        '--disable-gpu',
      ],
    }),
  ],
  controllers: [PlacesController],
  providers: [PlacesService],
})
export class PlacesModule {}
