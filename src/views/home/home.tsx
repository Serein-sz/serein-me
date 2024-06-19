import Galaxy from "@/components/galaxy";
import { Navigation } from "@/components/navigation";

import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute t-0 l-0 w-screen h-screen">
        <Navigation />
        <Outlet />
      </div>
      <Galaxy className="absolute t-0 l-0 -z-10" />
    </div>
  );
};

export default Home;
