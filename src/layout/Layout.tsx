import { Outlet } from "react-router";
import { Footer, Header } from "../components";

export const Layout: React.FC = () => {

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
