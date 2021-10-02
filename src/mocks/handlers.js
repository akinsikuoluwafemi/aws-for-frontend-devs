// import { rest } from 'msw';

// export const handlers = [
// 	rest.get('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=51.165691&lon=10.451526', (req, res, ctx) => {
   
// 		return res(
// 			ctx.json([
// 				{
// 					properties: {
// 						timeseries: [
// 							{
// 								time: '2019-12-03T14:00:00Z',
// 								data: {
// 									instant: {
// 										details: {
// 											air_pressure_at_sea_level: 1017.23,
// 											wind_speed: 5.9,
// 											dew_point_temperature: 8.1,
// 											relative_humidity: 81.1,
// 											wind_speed_of_gust: 15.9,
// 											cloud_area_fraction_high: 95.2,
// 											wind_from_direction: 121.3,
// 											cloud_area_fraction_medium: 95.2,
// 											cloud_area_fraction_low: 95.2,
// 											air_temperature: 17.1,
// 											fog_area_fraction: 95.2,
// 											cloud_area_fraction: 95.2,
// 										},
// 									},
// 									next_1_hours: {
// 										details: {
// 											air_temperature_max: 17.1,
// 											ultraviolet_index_clear_sky_max: 1,
// 											probability_of_precipitation: 37,
// 											precipitation_amount_max: 4.32,
// 											air_temperature_min: 11.1,
// 											precipitation_amount: 1.71,
// 											precipitation_amount_min: 4.32,
// 											probability_of_thunder: 54.32,
// 										},
// 										summary: {
// 											symbol_code: 'clearsky_day',
// 										},
// 									},
// 									next_12_hours: {
// 										summary: {
// 											symbol_code: 'clearsky_day',
// 										},
// 										details: {
// 											air_temperature_max: 17.1,
// 											ultraviolet_index_clear_sky_max: 1,
// 											probability_of_precipitation: 37,
// 											precipitation_amount_max: 4.32,
// 											air_temperature_min: 11.1,
// 											precipitation_amount: 1.71,
// 											precipitation_amount_min: 4.32,
// 											probability_of_thunder: 54.32,
// 										},
// 									},
// 									next_6_hours: {
// 										summary: {
// 											symbol_code: 'clearsky_day',
// 										},
// 										details: {
// 											air_temperature_max: 17.1,
// 											ultraviolet_index_clear_sky_max: 1,
// 											probability_of_precipitation: 37,
// 											precipitation_amount_max: 4.32,
// 											air_temperature_min: 11.1,
// 											precipitation_amount: 1.71,
// 											precipitation_amount_min: 4.32,
// 											probability_of_thunder: 54.32,
// 										},
// 									},
// 								},
// 							},
// 						],
// 						meta: {
// 							updated_at: '2019-12-03T13:52:13Z',
// 							units: {
// 								probability_of_thunder: '%',
// 								fog_area_fraction: '%',
// 								air_temperature: 'C',
// 								precipitation_amount: 'mm',
// 								cloud_area_fraction_low: '%',
// 								cloud_area_fraction_medium: '%',
// 								cloud_area_fraction_high: '%',
// 								precipitation_amount_max: 'mm',
// 								probability_of_precipitation: '%',
// 								relative_humidity: '%',
// 								ultraviolet_index_clear_sky_max: '1',
// 								air_pressure_at_sea_level: 'hPa',
// 								cloud_area_fraction: '%',
// 								precipitation_amount_min: 'mm',
// 								wind_from_direction: 'degrees',
// 								air_temperature_min: 'C',
// 								wind_speed_of_gust: 'm/s',
// 								air_temperature_max: 'C',
// 								dew_point_temperature: 'C',
// 								wind_speed: 'm/s',
// 							},
// 						},
// 					},
// 					geometry: {
// 						type: 'Point',
// 						coordinates: [60.5, 11.59, 1001],
// 					},
// 					type: 'Feature',
// 				},
// 			])
// 		);
// 	}),
// ];


import { rest } from 'msw';

export const handlers = [
	rest.get(
		'https://api.met.no/weatherapi/locationforecast/2.0/compact',
		(req, res, ctx) => {
			const query = req.url.searchParams;
			const lat = query.get('lat');
			const lon = query.get('lon');
			return res(
				ctx.json([
          lat,lon
				])
			);
		}
	),
];
