import style from "./status500.module.sass";
import notFound from "../../../assets/Icons/404.svg";

const Status500 = () => {
  return (
    <div className={style.container}>
      <div className={style.notFound}>
        <img src={notFound} alt="" />
        <h1>500</h1>
        <h3>Error interno del servidor</h3>
        <h4>Intente ingresar más tarde</h4>
      </div>
    </div>
  );
};

export default Status500;
