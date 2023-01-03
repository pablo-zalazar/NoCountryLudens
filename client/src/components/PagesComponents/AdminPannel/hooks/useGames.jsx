import useServices from "../../../../services/useServices.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useGames() {
  console.log("usegames");
  const [loadGames, setLoadGames] = useState(true);
  const { games: gameList } = useServices();
  const navigate = useNavigate();
  const [games, setGames] = useState(false);

  useEffect(() => {
    async function gamesLoad() {
      try {
        const result = await gameList.getAll();
        setGames(result.data.games);
        setLoadGames(false);
      } catch (err) {
        console.log(err);
        setLoadGames(false);
        setGames(false);
        navigate("/problemwithserver");
      }
    }
    gamesLoad();
    return setLoadGames(false);
  }, [loadGames]);

  return {
    games,
    loadGames,
    setLoadGames
  };
}

export default useGames;
