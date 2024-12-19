import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "../../hooks/useDebounce";
import { ILocation } from "../../types/weatherApi.type";
import weatherApiClient from "../../api/weatherClient";
import useClickOutside from "../../hooks/useClickOutside";

type Props = {
  updateLocation: Dispatch<SetStateAction<string>>;
};

const SearchInput = ({ updateLocation }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 300);

  const { data: matchingLocations = [] } = useQuery<ILocation[]>({
    queryKey: ["locations", { locatoin: debouncedSearch }],
    enabled: !!debouncedSearch,
    queryFn: async () => {
      const { data } = await weatherApiClient.get("/search.json", {
        params: { q: debouncedSearch },
      });
      return data;
    },
  });

  const [dropdownIsActive, setDropdownIsActive] = useState(false);
  const dropdownRef = useClickOutside<HTMLDivElement>(() =>
    setDropdownIsActive(false),
  );

  const selectLocationHandler = (locatoinName: string) => {
    updateLocation(locatoinName);
    setDropdownIsActive(false);
    setSearchValue(locatoinName);
  };

  const submitHanlder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    selectLocationHandler(searchValue);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <form onSubmit={submitHanlder} className="flex">
        <input
          title="search"
          type="search"
          name="search"
          placeholder="Search..."
          className="grow rounded-lg p-2 outline-none"
          autoComplete="off"
          autoFocus
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setDropdownIsActive(true)}
        />
      </form>

      {dropdownIsActive && (
        <ul className="absolute top-[105%] flex w-full flex-col gap-2 rounded-md bg-white font-semibold shadow-md">
          {matchingLocations.map(({ id, name }) => (
            <li
              key={id}
              onClick={() => selectLocationHandler(name)}
              className="cursor-pointer px-3 py-2 hover:bg-sky-200"
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
