import './App.css';
import { Route,Switch} from 'react-router-dom';
import Weather from './components/Weather';
import CityCapitals from './pages/CityCapitals';
import Header from './components/Header';


function App() {
	return (
		<>
			<Header/>
		
			<Switch>
				<Route exact path="/" component={Weather}/>
				<Route exact path="/city-capitals" component={CityCapitals}/>
			</Switch>
			
			</>
  );
}

export default App;
