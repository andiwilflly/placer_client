import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlacesModule } from './places/places.module';
import { ConfigModule } from '@nestjs/config';
// import { StatusMonitorModule } from 'nestjs-status-monitor';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-etaet.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    ),
    PlacesModule,
    // StatusMonitorModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
