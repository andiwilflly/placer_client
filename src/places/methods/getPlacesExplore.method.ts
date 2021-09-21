import { Browser, Page } from 'puppeteer';
import { IExploreParams, IPlace } from '../places.types';
import { Model } from 'mongoose';

export default async function ({
  browser,
  placesModel,
  exploreParams,
}: {
  browser: Browser;
  placesModel: Model<IPlace>;
  exploreParams: IExploreParams;
}): Promise<IPlace[]> {
  const page = await browser.newPage();
  await page.setCookie({
    name: 'oauth_token',
    value: '3IRHNTGMW1FXV2MK1A0LIZSKDXCRYE3I0BXW1FEZ50MEJWES-0',
    domain: '.foursquare.com',
  });

  return await _getPlaces({
    formattedPlaces: [],
    offset: 0,
    page,
    exploreParams,
    placesModel,
  });
}

async function _getPlaces({
  formattedPlaces,
  offset,
  page,
  exploreParams,
  placesModel,
}: {
  formattedPlaces: IPlace[];
  offset: number;
  page: Page;
  exploreParams: IExploreParams;
  placesModel: Model<IPlace>;
}): Promise<Array<any>> {
  await page.goto(_getFoursquareExploreUrl(exploreParams, offset));
  await page.content();

  console.log(
    _getFoursquareExploreUrl(exploreParams, offset),
    'ENTER====> formattedPlaces.length:',
    formattedPlaces.length,
    'offset:',
    offset,
  );

  const data = await page.evaluate(() => {
    return JSON.parse(document.querySelector('body').innerText);
  });

  const totalResults = data.response.totalResults;
  const places = data.response.groups
    .map((group) => group.items.map((item) => item))
    .flat();

  for (const place of places) {
    const formattedPlace: IPlace = _formatPlace(place);

    const isValid: boolean = await _validatePlace(placesModel, formattedPlace);
    if (!isValid) {
      console.log('Place is not valid: ', formattedPlace.name);
      console.log(formattedPlace.foursquareUrl);
      continue;
    }

    formattedPlaces.push(formattedPlace);
    // placesModel.create(formattedPlace).catch(console.log);
  }

  return totalResults > places.length + offset
    ? await _getPlaces({
        formattedPlaces,
        offset: offset + 50,
        page,
        exploreParams,
        placesModel,
      })
    : formattedPlaces;
}

function _getFoursquareExploreUrl(exploreParams: any, offset: number) {
  return `
      ${process.env.FOURSQUARE_API_URL}/venues/explore?
      client_id=${'XXXX'}&
      client_secret=${'XXXX'}&
      v=${process.env.FOURSQUARE_VERSION}&
      categoryId=${exploreParams.categoryId || []}&
      limit=${exploreParams.limit || 50}&
      offset=${offset || exploreParams.offset || 0}&
      radius=${exploreParams.radius || 500}&
      ll=${exploreParams.lat},${exploreParams.lng}`
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/ /g, '');
}

function _formatPlace(place): IPlace {
  return {
    foursquareId: place.venue.id,
    name: place.venue.name,
    address: place.venue.location.address,
    country: place.venue.location.country,
    city: place.venue.location.city,
    lat: place.venue.location.lat,

    lng: place.venue.location.lng,
    distance: place.venue.location.distance,
    isOpen:
      place.venue.hours && place.venue.hours.isOpen
        ? place.venue.hours.isOpen
        : true,
    openHours:
      place.venue.hours && place.venue.hours.status
        ? place.venue.hours.status
        : 'No data',
    photos: [
      ...(place.photo
        ? [`${place.photo.prefix}500x500${place.photo.suffix}`]
        : []),
    ],

    // Optional fields
    phone: place.venue.contact.formattedPhone
      ? `+38 ${place.venue.contact.formattedPhone}`
      : '',
    ...(place.venue.url && { url: place.venue.url }),
    ...(place.venue.contact.facebook && {
      fbUrl: `https://www.facebook.com/${place.venue.contact.facebook}`,
    }),
    foursquareUrl: `https://foursquare.com/v/${place.venue.id}`,
  };
}

async function _validatePlace(
  placesModel: Model<IPlace>,
  place: IPlace,
): Promise<boolean> {
  return await new Promise(async (resolve) => {
    await placesModel
      .validate(place)
      .catch((error) => {
        resolve(false);
      })
      .finally(() => resolve(true));
  });
}
