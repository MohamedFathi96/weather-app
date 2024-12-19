import { useState } from "react";
import HumidityIcon from "@/assets/svgs/humidity.svg?react";
import WindIcon from "@/assets/svgs/wind.svg?react";
import HeartIcon from "@/assets/svgs/favorite.svg?react";
import { ICurrentWeather, ILocation } from "../../types/weatherApi.type";
import ToggleButton from "../Ui/Buttons/ToggleButton";
import { WEATHER_ICONS } from "../../constants/weatherIcons";
import { useGlobalContext } from "../../context/global";

type Props = { weather: ICurrentWeather; location: ILocation };

const WeatherPreview = ({ weather, location }: Props) => {
  const [isCelsius, setIsCelsius] = useState(true);
  const { favorites, setfavorites } = useGlobalContext();

  const isFavorite = favorites.includes(location.name);
  const toggleFavorite = () => {
    const newFavorites = isFavorite
      ? favorites.filter((fav) => fav !== location.name)
      : [...favorites, location.name];
    setfavorites(newFavorites);
    sessionStorage.setItem("favorites", JSON.stringify(newFavorites));
  };
  return (
    <div className="relative flex grow flex-col items-center gap-6 text-lg">
      <HeartIcon
        onClick={() => toggleFavorite()}
        className={`absolute right-4 top-4 w-6 cursor-pointer ${isFavorite ? "text-red-800" : ""}`}
      />
      <img
        className="h-[140px] w-[140px]"
        src={
          WEATHER_ICONS[weather.condition.text as keyof typeof WEATHER_ICONS] ||
          weather.condition.icon
        }
        alt={weather.condition.text}
      />
      <div className="flex items-center gap-2 text-[4rem]">
        <h2>{isCelsius ? `${weather.temp_c} °C` : `${weather.temp_f} °F`}</h2>
        <ToggleButton checked={isCelsius} updateStatus={setIsCelsius} name="" />
      </div>
      <h3>{location.name}</h3>

      <div className="flex w-full justify-between">
        <div className="flex gap-2 text-center">
          <HumidityIcon className="w-6 text-white" />
          <div className="flex flex-col">
            {weather.humidity}
            <span>Humidity</span>
          </div>
        </div>
        <div className="flex gap-2 text-center">
          <WindIcon className="w-7" />
          <div className="flex flex-col">
            {weather.wind_kph} kph
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPreview;
