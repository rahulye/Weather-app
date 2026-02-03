/** @format */
import type { FC } from "react";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import type {WeatherData} from "../types/weather";
import { ImSpinner2 } from "react-icons/im";

interface IWeatherProps {
	weather: WeatherData | null;
	loading: boolean
}

export const Weather: FC<IWeatherProps> = ({ weather , loading }) => {
	if (loading) {
		return (
			<ImSpinner2 className="animate-spin mt-4" />
		)
	}
	if(!weather) return null;
	return (
		<>
			<section className="flex text-2xl  gap-2 text-white flex-col w-full font-medium items-center">
				<div className="flex h-35">
					<img src={`images/${weather?.weather[0].main.toLowerCase()}.png`} alt="weather-icon"></img>
				</div>
				<div className="text-6xl">{weather?.main.temp}</div>
				<div>{weather?.name}</div>
			</section>
			<section className="flex-col gap-4 items-center xs:flex-row text-white flex w-full mt-8 justify-around text-lg">
				<div className="flex items-center gap-2">
					<WiHumidity size={30} />
					<div>
						<div>{weather?.main.humidity} %</div>
						<div>Humidity</div>
					</div>
				</div>
				<div className="flex items-center gap-3">
					<FaWind size={30} />
					<div>
						<div>{weather?.wind.speed} km/h</div>
						<div>Wind Speed</div>
					</div>
				</div>
			</section>
		</>
	);
};
