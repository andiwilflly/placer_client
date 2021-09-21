import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Place {
  @Prop({ required: true })
  foursquareId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  lat: number;

  @Prop({ required: true })
  lng: number;

  @Prop({ required: true })
  isOpen: boolean;

  @Prop({ required: true })
  openHours: string;

  @Prop({ required: true })
  distance: number;

  @Prop({ required: true })
  photos: Array<string>;

  @Prop()
  phone: string;

  @Prop()
  url: string;

  @Prop()
  fbUrl: string;

  @Prop()
  foursquareUrl: string;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);
