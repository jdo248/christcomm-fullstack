import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const HomeLayout = () => {
  return (
    <div className="home-layout d-flex flex-column min-vh-100">
      <Header />
      <div className="px-4 flex-grow-1 bg-primary bg-opacity-25 py-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default HomeLayout;
