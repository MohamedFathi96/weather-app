import { Outlet } from "react-router";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <div className="bg-weather-image flex h-screen flex-col items-center justify-center bg-cover">
      <Navbar />
      <div className="flex h-[70%] max-h-[450px] w-[60%] max-w-[550px] flex-col rounded-lg bg-gradient-to-r from-gray-800 via-blue-700 to-gray-900 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
