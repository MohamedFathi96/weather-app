import { useNavigate } from "react-router";
import { useGlobalContext } from "../context/global";
import { ICurrentWeather, ILocation } from "../types/weatherApi.type";

const HistoryPage = () => {
  const { history } = useGlobalContext();
  const navigate = useNavigate();

  const historyClickHandler = (
    location: ILocation,
    weather: ICurrentWeather,
  ) => {
    navigate("/", { state: { location, weather } });
  };
  return (
    <div className="flex h-full grow flex-col gap-6">
      <h1 className="text-2xl font-semibold text-white">History</h1>
      <div className="flex flex-col gap-4 overflow-y-auto">
        {history.length ? (
          <>
            {history.map(({ location, weather }, index) => (
              <div
                key={index}
                onClick={() => historyClickHandler(location, weather)}
                className="flex cursor-pointer flex-col gap-2 rounded-lg px-2 hover:shadow-2xl"
              >
                <div className="text-lg font-semibold text-white">
                  {location.name}, {location.region}
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="text-white">
                      Temperature: {weather.temp_c}°C
                    </div>
                    <div className="text-white">
                      Condition: {weather.condition.text}
                    </div>
                  </div>
                  <img src={weather.condition.icon} alt="weather icon" />
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="flex grow justify-center text-center text-2xl italic text-white">
            No History...
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
