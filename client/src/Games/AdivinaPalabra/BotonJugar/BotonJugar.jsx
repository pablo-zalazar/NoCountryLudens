import PropTypes from "prop-types";

const BotonJugar = ({ jugar, empezarJuego }) => {
  return (
    <button
      onClick={() => empezarJuego()}
      style={{ color: "#111", backgroundColor: "#F2CF8D", border: "2px solid #fff" }}
    >
      {jugar}
    </button>
  );
};

BotonJugar.propTypes = {
  jugar: PropTypes.string,
  empezarJuego: PropTypes.func
};

export default BotonJugar;
