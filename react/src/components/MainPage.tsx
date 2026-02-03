/** @format */

import { useEffect, useState, type ChangeEvent, type FC } from "react";
import { USER_API, API_URL } from "../config/api";
import axios from "axios";
import { Header } from "./Header";
import { Weather } from "./Weather";
import type { WeatherData } from "../types/weather";

export const MainPage: FC = () => {
	const [city, setCity] = useState<string>("");
	const [weather, setWeather] = useState<WeatherData | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const stored = localStorage.getItem("weather");
		if (stored) {
			setWeather(JSON.parse(stored));
		}
	},[]);
	
	useEffect(() => {
		if (weather) {
			localStorage.setItem("weather", JSON.stringify(weather));
		}
	},[weather]);

	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setCity(event.target.value);
	};

	const loadWeather = async (): Promise<void> => {
		setLoading(true);
		try {
			const response = await axios.get(
				`${API_URL}&appid=${USER_API}&q=${city}`,
			);
			setWeather(response.data);
		} catch {
			setTimeout(() => {
				handleInvalidInput();
			}, 800)
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 800);
		}
	};
	
	const handleInvalidInput = (): void => {
		setError("Invalid value");
		setTimeout(() => {
			setError(null);
		}, 1800);
	};

	const handleSearch = (): void | null => {
		if (city.trim() === "") {
			handleInvalidInput();
			return null;
		}
		loadWeather();
		setCity("");
	};

	return (
		<main>
			<Header
				handleChange={handleChange}
				handleSearch={handleSearch}
				city={city}
				error={error}
			></Header>
			<Weather weather={weather} loading={loading}></Weather>
		</main>
	);
};
