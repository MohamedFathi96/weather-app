import { NavLink } from "react-router";

const LINKS = [
  {
    id: 1,
    name: "Home",
    url: "/",
  },
  {
    id: 2,
    name: "History",
    url: "/history",
  },
  {
    id: 3,
    name: "Favorites",
    url: "/favorite",
  },
];

const Navbar = () => {
  return (
    <div className="mb-7 rounded-lg bg-blue-800 p-4 font-semibold text-white">
      <ul className="flex gap-[80px]">
        {LINKS.map(({ id, name, url }) => (
          <NavLink
            key={id}
            className={({ isActive }) =>
              `cursor-pointer ${isActive ? "underline" : ""}`
            }
            to={url}
          >
            {name}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
