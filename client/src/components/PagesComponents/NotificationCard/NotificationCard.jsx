import style from "./notificationCard.module.sass";
import PropTypes from "prop-types";
import close from "../../../../assets/Icons/close.svg";
import logoM from "../../../../assets/Icons/logoHeaderM.svg";
import Card from "../Card/Card";

const NotificationCard = ({ mode, avatar, name, imgUrl, message, nameGame }) => {
  return (
    <div className={style.card}>
      {/* Header */}
      <div className={style.head}>
        {mode === "news" && (
          <>
            <img src={logoM} alt="" />
            <h1>Novedades</h1>
            <img className={style.close} src={close} alt="" />
          </>
        )}
        {mode === "challenge" && <h1>Desafío de amigo</h1>}
        {mode === "friend" && <h1>Solicitud de amistad</h1>}
        {mode === "challengeAc" && <h1>Desafío</h1>}
      </div>
      {/* Main */}
      {mode === "news" && (
        <>
          <h4>Hemos Agregado un nuevo juego.</h4>
          <h4>¡No dejes de aprender y divertirte!</h4>
        </>
      )}
      {mode === "friend" && (
        <h4>
          <span className={style.res}>{name}</span> quiere ser tu amigo/a
        </h4>
      )}
      {mode === "challengeAc" && (
        <h4>
          <span className={style.res}>{name}</span> acaba de aceptar tu desafío
        </h4>
      )}
      <div className={style.desk}>
        {mode !== "news" && <img className={style.avatar} src={avatar} alt="" />}
        {mode === "challenge" && (
          <>
            <h2>{name}</h2>
            <div className={style.box}>
              <h4>¡Te desafío en</h4>
              <h4>
                <strong>{nameGame}!</strong>
              </h4>
              <img className={style.img} src={imgUrl} alt="" />
            </div>
          </>
        )}
        {mode === "news" && (
          <>
            <Card onlyShow={true} cover={imgUrl} name={nameGame} stars={4} size="small" />
            <h4 className={style.center}>{message}</h4>
          </>
        )}
      </div>
      {/* Botones */}
      {mode === "challenge" && (
        <>
          <button className={style.btn1}>Aceptar desafío</button>
          <button className={style.btn2}>Ignorar</button>
        </>
      )}
      {mode === "friend" && (
        <>
          <button className={style.btn1}>Aceptar</button>
          <button className={style.btn2}>Rechazar</button>
        </>
      )}
      {mode === "news" && <button className={style.btn1}>Ir al juego</button>}
      {mode === "challengeAc" && <button className={style.btn1}>A jugar</button>}
    </div>
  );
};

NotificationCard.propTypes = {
  mode: PropTypes.string,
  avatar: PropTypes.string,
  name: PropTypes.string,
  imgUrl: PropTypes.string,
  message: PropTypes.string,
  nameGame: PropTypes.string
};

export default NotificationCard;
