import style from "./failedRegister.module.sass";
import failed from "../../../../assets/Icons/404.svg";
import { Link } from "react-router-dom";

const FailedRegister = () => {
  return (
    <div className={style.failed_container}>
      <div className={style.failed}>
        <img src={failed} alt="" />
        <h3>No se ha registrado correctamente</h3>
        <Link to="/signup">
          <button>Vuelve a Registrarte</button>
        </Link>
      </div>
    </div>
  );
};

export default FailedRegister;
