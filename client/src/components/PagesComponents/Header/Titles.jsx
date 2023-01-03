import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Titles = () => {
  const [home, setHome] = useState(false);
  const [headerTitle, setheaderTitle] = useState("LudenS");
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    switch (true) {
      case path === "/":
        setHome(true);
        break;
      case path !== "/":
        setHome(false);
        switch (true) {
          case path === "/favourites":
            setheaderTitle("Favoritos");
            break;
          case path === "/notifications":
            setheaderTitle("Notificaciones");
            break;
          case path === "/messages":
            setheaderTitle("Mensajes");
            break;
          case path === "/account":
            setheaderTitle("Perfíl");
            break;
          case path.substring(0, 6) === "/games":
            setheaderTitle("Juegos");
            break;
          default:
            setheaderTitle("LudenS");
            break;
        }
    }
  }, [location]);
  return { home, headerTitle };
};

export default Titles;
