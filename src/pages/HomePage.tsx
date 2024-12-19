import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import weatherApiClient from "../api/weatherClient";
import { ICurrentWeather, ILocation } from "../types/weatherApi.type";
import SearchInput from "../components/Weather/SearchInput";
import WeatherPreview from "../components/Weather/WeatherPreview";
import { useGlobalContext } from "../context/global";
import { useLocation } from "react-router";

const HomePage = () => {
  const { state } = useLocation();
  const [selectedLocation, setSelectedLocation] = useState(
    state?.location?.name || "",
  );
  const { history, setHistory } = useGlobalContext();

  const {
    data: currentWeather,
    isLoading,
    isError,
    error,
  } = useQuery<{ current: ICurrentWeather; location: ILocation }>({
    queryKey: ["weather", "current", selectedLocation],
    enabled: !!selectedLocation,
    queryFn: async () => {
      const { data } = await weatherApiClient.get("/current.json", {
        params: { q: selectedLocation },
      });
      return data;
    },
  });

  useEffect(() => {
    if (currentWeather) {
      const newHistory = [
        {
          weather: currentWeather.current,
          location: currentWeather.location,
        },
        ...history,
      ].slice(0, 5);
      setHistory(newHistory);
      sessionStorage.setItem("history", JSON.stringify(newHistory));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWeather, setHistory]);

  return (
    <div className="flex flex-col gap-6">
      <SearchInput updateLocation={setSelectedLocation} />

      <div className="flex grow items-center text-lg font-semibold text-white">
        {isLoading ? (
          <div className="grow text-center italic">Loading...</div>
        ) : isError ? (
          <div className="grow text-center text-red-700">{error.message}</div>
        ) : currentWeather ? (
          <WeatherPreview
            weather={currentWeather.current}
            location={currentWeather.location}
          />
        ) : (
          <div className="grow text-center text-2xl italic">
            Select A Region
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
