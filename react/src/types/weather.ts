/** @format */

export interface WeatherData {
	name: string; //"Chennai";
	coord: {
		lon: number;
		lat: number;
	};
	weather: {
		main: string; //"Clouds",
	}[];
	main: {
		temp: number; //25.59
		humidity: number; //67
	};
	wind: {
		speed: number; //4.63
	};
}
