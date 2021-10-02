import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Alert } from 'antd';
import Autocomplete from '@material-ui/lab/Autocomplete';

// internal imports
import WeatherDisplay from './WeatherDisplay';
import locations from '../locations.json';




const Weather = () => {
	const [allCities, setAllCities] = useState([]);
	const [weatherTimeSeries, setWeatherTimeseries] = useState([]);
	const [weatherUnits, setWeatherUnits] = useState([]);
	const [inputLocation, setInputLocation] = useState('');
	const [loading, setLoading] = useState(false);
	const [fieldInput, setfieldInput] = useState('');
	const [open, setOpen] = useState(true);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('')

	useEffect(() => {

		setAllCities(locations);
	}, []);


	
	const getForcast = async (lat, lng) => {
		try{
				setLoading(true);
				const BASE_URL = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lng}`;

				const res = await fetch(BASE_URL);

				const forecast = await res.json();
			setLoading(false);
			setError(false);
			

				const {
					properties: {
						timeseries,
						meta: { units },
					},
				} = forecast;
			// taking just the first weather data from the list of more than 80 items
				setWeatherTimeseries(timeseries[0]);
				setWeatherUnits(units);
		}catch(e){
			setErrorMessage(e.message);
			setLoading(false);
			setError(true)

		}

	};


	return (
		<div style={{background: 'teal'}}>
			<Autocomplete
				id="Type city or capital names"
				data-testid="element"
				// solving the debounce issue with the open prop
				open={fieldInput.length > 1 && open}
				options={allCities || locations}
				onBlur={() => setOpen(false)}
				getOptionLabel={(option) => {
					return option.name || option.asciiname;
				}}
				onChange={(e, value) => {
					if (value) {
						setInputLocation(value.name);
						setOpen(false);

						getForcast(value.latitude, value.longitude);
					}
				}}
				style={{ width: 400, margin: '2rem auto' }}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Type city or capital names"
						variant="outlined"
						onChange={(e) => {
							setfieldInput(e.target.value);
							setOpen(true);
						}}
						placeholder="Enter city name or Capital"
					/>
				)}
			/>

			{error && <Alert style={{ width: '20rem', margin: 'auto'}} message={errorMessage} type="error" closable showIcon />}

			<WeatherDisplay
				loading={loading}
				weatherTimeSeries={weatherTimeSeries && weatherTimeSeries}
				weatherUnits={weatherUnits && weatherUnits}
				inputLocation={inputLocation && inputLocation}
			/>
		</div>
	);
};


export default Weather;