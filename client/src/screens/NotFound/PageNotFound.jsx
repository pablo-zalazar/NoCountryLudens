import style from "./pageNotFound.module.sass";
import notFound from "../../../assets/Icons/404.svg";

const PageNotFound = () => {
  return (
    <div className={style.container}>
      <div className={style.notFound}>
        <img src={notFound} alt="" />
        <h1>404</h1>
        <h3>Página no encontrada</h3>
        <h4>La página que estas buscando no existe o un error ha ocurrido</h4>
      </div>
    </div>
  );
};

export default PageNotFound;
