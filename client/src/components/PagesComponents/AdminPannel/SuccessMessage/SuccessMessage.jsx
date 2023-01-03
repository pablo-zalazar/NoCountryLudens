import { useNavigate } from "react-router-dom";
import classes from "./successMessage.module.sass";
import PropTypes from "prop-types";

const SuccessMessage = ({ gameName, coverGame }) => {
  const navigate = useNavigate();

  const handleClick = e => {
    navigate("/admin");
  };
  return (
    <div className={classes.container}>
      <div>
        <p>Has ingresado correctamente tu nuevo juego:</p>
        <p>{gameName}</p>
      </div>
      <div className={classes.imageContainer}>
        <img src={coverGame} alt={gameName}></img>
      </div>
      <button onClick={handleClick}>Volver al panel principal</button>
    </div>
  );
};

export default SuccessMessage;

SuccessMessage.propTypes = {
  gameName: PropTypes.string.isRequired,
  coverGame: PropTypes.string.isRequired
};
