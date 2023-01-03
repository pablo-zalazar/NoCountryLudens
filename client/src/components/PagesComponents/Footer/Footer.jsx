import style from "./footer.module.sass";
import term from "../../../../assets/Icons/fterm.svg";
import team from "../../../../assets/Icons/fteam.svg";
import help from "../../../../assets/Icons/fhelp.svg";
import faq from "../../../../assets/Icons/ffaq.svg";

export const Footer = () => {
  return (
    <div className={style.footer_content}>
      <p className={style.copyD}>Copyright Ludens@ 2022. All rights reserved.</p>
      <div className={style.d_flex}>
        <h3>Términos</h3>
        <img src={term} alt="" />
      </div>
      <div className={style.d_flex}>
        <h3>Nuestro equipo</h3>
        <img src={team} alt="" />
      </div>
      <div className={style.d_flex}>
        <h3>Ayuda</h3>
        <img src={help} alt="" />
      </div>
      <div className={style.d_flex}>
        <h3>Preguntas frecuentes</h3>
        <img src={faq} />
      </div>

      <p className={style.copyM}>
        Copyright Ludens@ 2022. <br />
        All rights reserved.
      </p>
    </div>
  );
};
