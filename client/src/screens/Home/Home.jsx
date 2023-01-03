import "keen-slider/keen-slider.min.css";
import style from "./home.module.sass";
import { useKeenSlider } from "keen-slider/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearFilter } from "../../redux/slices/filter";
import useServices from "../../services/useServices";
import Card from "../../components/PagesComponents/Card/Card";
import SpinnerLoad from "../../components/PagesComponents/SpinnerLoad/SpinnerLoad";
import medal from "../../../assets/Icons/medalstar.svg";
import magicstar from "../../../assets/Icons/magic-star.svg";
import arrow from "../../../assets/Icons/arrow.svg";

const Home = () => {
  const [recommended, setRecommended] = useState();
  const [gamelist, setGamelist] = useState([]);
  const [filteredGames, setFilteredGames] = useState();
  const [isGameListLoading, setIsGameListLoading] = useState(true);
  const { games } = useServices();
  const { filter } = useSelector(state => state.filter);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [sliderRef] = useKeenSlider({
    breakpoints: {
      "(min-width: 550px)": { slides: { perView: 3, spacing: 5 } },
      "(min-width: 1410px)": { slides: { perView: 4, spacing: 5 } }
    },
    slides: { perView: 2, spacing: 15 }
  });

  useEffect(() => {
    async function gamesLoad() {
      try {
        const { data } = await games.getAll();
        const sorted = data.games.sort((a, b) => b.stars - a.stars);
        setGamelist(data.games);
        setRecommended(sorted.slice(0, 4));
        setFilteredGames(sorted.slice(4));
        setIsGameListLoading(false);
      } catch (err) {
        setIsGameListLoading(false);
        navigate("/404");
      }
    }
    gamesLoad();
  }, []);

  useEffect(() => {
    if (filter) {
      setFilteredGames(
        gamelist.filter(game => game.name.toLowerCase().includes(filter.toLowerCase()))
      );
    } else {
      setFilteredGames(gamelist.sort((a, b) => b.stars - a.stars).slice(4));
    }
  }, [filter]);

  const resetFilter = () => {
    dispatch(clearFilter());
  };

  return (
    <div className={style.home}>
      {isGameListLoading ? (
        <SpinnerLoad className={style.spinner} />
      ) : (
        <>
          {!filter && (
            <>
              <div className={style.d_flex}>
                <h2>Recomendados</h2>
                <img src={medal} />
              </div>
              <div className={`${style.cards} "navigation-wrapper"`}>
                <div ref={sliderRef} className="keen-slider">
                  {recommended.map(
                    (
                      {
                        _id,
                        cover,
                        name,
                        stars,
                        description,
                        audiencies,
                        comingSoon,
                        folder,
                        devices
                      },
                      i
                    ) => (
                      <Card
                        key={i}
                        gameId={_id}
                        name={name}
                        cover={cover.path}
                        stars={stars}
                        description={description}
                        minAge={audiencies}
                        path={`/games/${_id}`}
                        comingSoon={comingSoon}
                        devices={devices}
                      />
                    )
                  )}
                </div>
              </div>
              <div className={style.d_flex}>
                <h2>Juegos</h2>
                <img src={magicstar} />
              </div>
              <div className={style.cards_small}>
                {filteredGames.map(
                  (
                    { _id, cover, name, stars, description, audiencies, comingSoon, devices },
                    i
                  ) => (
                    <Card
                      key={i}
                      gameId={_id}
                      name={name}
                      cover={cover.path}
                      stars={stars}
                      description={description}
                      minAge={audiencies}
                      path={`/games/${_id}`}
                      comingSoon={comingSoon}
                      size="small"
                      devices={devices}
                    />
                  )
                )}
              </div>
            </>
          )}
          {filter && (
            <>
              <div className={style.d_flex2}>
                <img onClick={resetFilter} src={arrow} alt="" />
                <h2>Resultado</h2>
              </div>
              <div>
                {filteredGames.map(
                  ({ _id, cover, name, stars, description, audiencies, folder }, i) => (
                    <div key={i} className={style.cards_search}>
                      <Card
                        gameId={_id}
                        name={name}
                        cover={cover.path}
                        stars={stars}
                        description={description}
                        minAge={audiencies}
                        folder={folder}
                        path={`/games/${_id}`}
                        size="small"
                      />
                      <div className={style.desc}>
                        <h3>Descripción:</h3>
                        <p>{description}</p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
