import { render, screen } from '@testing-library/react';
import WeatherDisplay from '../components/WeatherDisplay';
import { StaticRouter } from 'react-router-dom';


test('weather info in cards from the server', () => {
	render(
		<StaticRouter>
			<WeatherDisplay weatherTimeSeries="Weather information" />
		</StaticRouter>
	);

	const promptText = screen.getByText('Input a Location');
	// expect promptext to be on the screeen
  expect(promptText).toBeInTheDocument();
  

})




it('loading spinner is in document before the response arrives', async () => {
  render(
		<StaticRouter>
			<WeatherDisplay weatherTimeSeries="Weather information" loading="loading" weatherUnits="weatherUnits" />
		</StaticRouter>
  );


	const loadingSpinner = screen.getByTestId('loading');
	expect(loadingSpinner).toBeInTheDocument();


});

