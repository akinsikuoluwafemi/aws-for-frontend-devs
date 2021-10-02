import React, {useState, useEffect} from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Card } from 'antd';
import axios from 'axios';
import { Alert } from 'antd';

// internal imports
import cityCapitalData from '../capitals.json';
import mapStyles from '../mapStyles';





const mapContainerStyle = {
  width: "100vw",
  height: "100vh"
}

const center = {
	lat: 51.165691,
	lng: 10.451526,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
}

export default function CityCapitals() {
	
  useEffect(() => {
    getWeather(51.165691, 10.451526);
  },[])
  
  const [selectedMarker, setSelectedMarker] = useState(null);
	const [loadingWeather, setLoadingWeather] = useState(false);
	const [markerWeatherData, setMarkerWeatherData] = useState({});

	const getWeather = async (lat, lng) => {
	
		
		try{
				const res = await axios.get(
					`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lng}`
				);
				const weather = res.data;

				const units = weather.properties.meta.units;
				const timeseries = weather.properties.timeseries[0].data.instant.details;

				setMarkerWeatherData({
					...units,
					timeseries,
				});
		}catch(e){
			alert(e.message);
		}


	};


	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	});


	if (loadError) return  <Alert style={{ width: '20rem', margin: 'auto'}} message= 'Error Loading Map' type='error' closable showIcon />;
	if (!isLoaded) return <Alert style={{ width: '20rem', margin: 'auto'}} message= 'Loading Map...' type='info' closable showIcon />;

	return (
		<div >
			<GoogleMap mapContainerStyle={mapContainerStyle} zoom={6} center={center} options={options} >
				{cityCapitalData.map((data) => (
					<Marker
						key={data.name}
						position={{ lat: data.latitude, lng: data.longitude }}
						onClick={() => {
							setLoadingWeather(true);
							setSelectedMarker(data);
							// console.log(data);
							getWeather(data.latitude, data.longitude);
							setLoadingWeather(false);
						}}
					/>
				))}

				{/* show info window when data returns */}
				{selectedMarker && !loadingWeather && markerWeatherData && (
					<InfoWindow
						position={{ lat: selectedMarker.latitude, lng: selectedMarker.longitude }}
						onCloseClick={() => {
							setSelectedMarker(null);
						}}
					>
						<div>
              <Card>
                <h3>{selectedMarker.name}</h3>
								<small>
									Air Pressure at sea level:{' '}
									{markerWeatherData.timeseries.air_pressure_at_sea_level}{' '}
									{markerWeatherData.air_pressure_at_sea_level}{' '}
								</small>
								<br />
								<small>
									Air temperature: {markerWeatherData.timeseries.air_temperature}{' '}
									{markerWeatherData.air_temperature}{' '}
								</small>
								<br />
								<small>
									Cloud Area Fraction:{' '}
									{markerWeatherData.timeseries.cloud_area_fraction}{' '}
									{markerWeatherData.cloud_area_fraction}{' '}
								</small>
								<br />
								<small>
									Relative Humidity:{' '}
									{markerWeatherData.timeseries.relative_humidity}{' '}
									{markerWeatherData.relative_humidity}{' '}
								</small>
								<br />
								<small>
									Wind Direction:{' '}
									{markerWeatherData.timeseries.wind_from_direction}{' '}
									{markerWeatherData.wind_from_direction}{' '}
								</small>
							</Card>
						</div>
					</InfoWindow>
				)}
			</GoogleMap>
		</div>
	);
}
