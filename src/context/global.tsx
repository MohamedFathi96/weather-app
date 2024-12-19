import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { ICurrentWeather, ILocation } from "../types/weatherApi.type";

type HistoryItem = { weather: ICurrentWeather; location: ILocation };

type GlobalContextType = {
  history: HistoryItem[];
  setHistory: Dispatch<SetStateAction<HistoryItem[]>>;
  favorites: string[];
  setfavorites: Dispatch<SetStateAction<string[]>>;
};

const GlobalContext = createContext<GlobalContextType>({
  history: [],
  setHistory: () => {},
  favorites: [],
  setfavorites: () => {},
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<HistoryItem[]>(
    sessionStorage.getItem("history")
      ? JSON.parse(sessionStorage.getItem("history")!)
      : [],
  );
  const [favorites, setfavorites] = useState<string[]>(
    sessionStorage.getItem("favorites")
      ? JSON.parse(sessionStorage.getItem("favorites")!)
      : [],
  );

  return (
    <GlobalContext.Provider
      value={{ history, setHistory, favorites, setfavorites }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => useContext(GlobalContext);
