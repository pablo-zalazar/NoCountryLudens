import style from "./successRegister.module.sass";
import success from "../../../../assets/Icons/exito.svg";
import { Link } from "react-router-dom";

const SuccesRegister = () => {
  return (
    <div className={style.success_container}>
      <div className={style.success}>
        <img src={success} alt="" />
        <h3>Se ha registrado exitosamente</h3>
        <Link to="/login">
          <button>Vuelve a Iniciar sesión</button>
        </Link>
      </div>
    </div>
  );
};

export default SuccesRegister;
