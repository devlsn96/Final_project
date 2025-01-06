import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout({ user, setUser, token, setToken }) {

  return (
    <>
      <Header  user={user} setUser={setUser} token={token} setToken={setToken} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
