import { Link } from "react-router";
import { useGlobalContext } from "../context/global";

const FavoritePage = () => {
  const { favorites } = useGlobalContext();
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-white">Favorites</h1>
      <div className="grid grid-cols-1 gap-6 text-lg">
        {favorites.map((fav) => (
          <Link
            key={fav}
            to="/"
            state={{ location: { name: fav } }}
            className="flex items-center justify-between rounded-lg bg-blue-500 p-4 font-semibold text-white"
          >
            <span>{fav}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FavoritePage;
