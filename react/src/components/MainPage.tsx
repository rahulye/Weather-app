/** @format */

import { useEffect, useState, type ChangeEvent, type FC } from "react";
import { USER_API, API_URL } from "../config/api";
import axios from "axios";
import { Header } from "./Header";
import { Weather } from "./Weather";
import type {WeatherData} from "../types/weather";

export const MainPage: FC = () => {
	const [city, setCity] = useState<string>("");
	const [weather, setWeather] = useState<WeatherData | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setCity(event.target.value);
	};

	const loadWeather = async (): Promise<void> => {
		try {
			const response = await axios.get(`${API_URL}&appid=${USER_API}&q=${city}`);
			setWeather(response.data);
		} catch(error: unknown) {
			console.error(error);
		} finally {
			setTimeout(() => {
				setLoading(true)
			}, 1000)
		}
	};

	const handleSearch = (): void => {
		loadWeather();
	};
	useEffect(() => {
		console.log(weather);
	}, [weather]);
	return (
		<main>
			<Header
				handleChange={handleChange}
				handleSearch={handleSearch}
				city={city}
				loading={loading}
			></Header>
			<Weather weather={weather} loading={loading}></Weather>
		</main>
	);
};
