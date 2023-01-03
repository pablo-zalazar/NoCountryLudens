import PropTypes from "prop-types";
import classes from "../Botones/boton.module.sass";

const Boton = ({ letra, clickLetras }) => {
  return (
    <button className={classes.boton_letra} onClick={e => clickLetras(e)}>
      {letra}
    </button>
  );
};

Boton.propTypes = {
  letra: PropTypes.string,
  clickLetras: PropTypes.func
};

export default Boton;
