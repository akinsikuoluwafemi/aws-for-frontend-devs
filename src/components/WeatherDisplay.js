import React from 'react';
import { Card, Divider, Spin} from 'antd';

export default function WeatherDisplay({ weatherTimeSeries, weatherUnits, inputLocation, loading }) {
	// console.log(weatherUnits);
	// console.log(weatherTimeSeries);

	const { data } = weatherTimeSeries;

	return (
		<div>
			{loading ? (
				<div data-testid="loading" style={{ textAlign: 'center' }}>
					<Spin />
				</div>
			) : (
				<div>
					{data ? (
							<Card
								data-testid="resolved"
							title={`Weather information of ${inputLocation ? inputLocation : '---'}`}
							style={{ width: 400, margin: 'auto' }}
						>
							<p style={{ color: 'teal' }}>Current Weather</p>
							<Card hoverable={true} aria-label="card">
								<div>
									<p>
										Air Pressure at sea level:{' '}
										{data && data.instant.details.air_pressure_at_sea_level}{' '}
										{weatherUnits && weatherUnits.air_pressure_at_sea_level}
									</p>
									<p>
										Air temperature: {data && data.instant.details.air_temperature}{' '}
										{weatherUnits && weatherUnits.air_temperature}
									</p>
									<p>
										Cloud Area Fraction: {data && data.instant.details.cloud_area_fraction}{' '}
										{weatherUnits && weatherUnits.cloud_area_fraction}
									</p>
									<p>
										Relative Humidity: {data && data.instant.details.relative_humidity}{' '}
										{weatherUnits && weatherUnits.relative_humidity}
									</p>
									<p>
										Wind from Direction: {data && data.instant.details.wind_from_direction}{' '}
										{weatherUnits && weatherUnits.wind_from_direction}
									</p>
								</div>
							</Card>
							<Divider />
							<p style={{ color: 'teal' }}>Next One hour</p>
							<Card hoverable={true} aria-label="card">
								<div>
									<p>
										Precipitation Amount: {data && data.next_1_hours.details.precipitation_amount}{' '}
										{''} {weatherUnits.precipitation_amount}
									</p>
									<p>Summary: {data && data.next_1_hours.summary.symbol_code} </p>
								</div>
							</Card>
							<Divider />

							<p style={{ color: 'teal' }}>Next Six hours</p>
							<Card hoverable={true} aria-label="card">
								<div>
									<p>
										Precipitation Amount: {data && data.next_6_hours.details.precipitation_amount}{' '}
										{''} {weatherUnits.precipitation_amount}
									</p>
									<p>Summary: {data && data.next_6_hours.summary.symbol_code} </p>
								</div>
							</Card>

							<Divider />
							<p style={{ color: 'teal' }}>Next twelve hours</p>
							<Card hoverable={true} aria-label="card">
								<div>
									<p>Summary: {data && data.next_12_hours.summary.symbol_code} </p>
								</div>
							</Card>
						</Card>
					) : (
						<h2 style={{ textAlign: 'center' }}>Input a Location</h2>
					)}
				</div>
			)}
		</div>
	);
}


