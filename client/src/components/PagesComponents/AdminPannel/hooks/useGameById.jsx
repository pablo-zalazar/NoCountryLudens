import useServices from "../../../../services/useServices.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function useGameById({ id, initValues }) {
  const { games } = useServices();
  const navigate = useNavigate();
  const [loadGame, setLoadGame] = useState(true);
  const [game, setGame] = useState(false);
  const [idGame] = useState(id || false);
  const [successSubmit, setSuccessSubmit] = useState(false);
  const [submitProcess, setSubmitProcess] = useState(false);

  useEffect(() => {
    if (idGame) {
      (async () => {
        try {
          // eslint-disable-next-line testing-library/no-await-sync-query
          const result = await games.getById(idGame);
          setGame(result.data.game);
          setLoadGame(false);
        } catch (err) {
          console.log(err);
          setLoadGame(false);
          setGame(false);
          navigate("/problemwithserver");
        }
      })();
    } else {
      setGame(initValues);
      setLoadGame(false);
    }
  }, [loadGame]);

  const submitMyForm = async formData => {
    setSubmitProcess(true);
    if (formData) {
      try {
        if (id) {
          const result = await games.modify(id, formData, {
            headers: { "Content-Type": "multipart/form-data" }
          });
          if (result.data) {
            console.log(result.data.game);
            setSuccessSubmit(() => result.data.game);
            setSubmitProcess(false);
          }
        } else {
          const result = await games.create(formData, {
            headers: { "Content-Type": "multipart/form-data" }
          });
          if (result.data) {
            setSuccessSubmit(() => result.data.game);
            setSubmitProcess(false);
          }
        }
      } catch (err) {
        console.log(err);
        navigate("/problemwithserver");
        setSubmitProcess(false);
      }
    }
  };

  return {
    game,
    loadGame,
    successSubmit,
    submitProcess,
    setSubmitProcess,
    submitMyForm,
    setLoadGame
  };
}

export default useGameById;

useGameById.propTypes = {
  id: PropTypes.string,
  initValues: PropTypes.object
};
