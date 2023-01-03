import { useEffect, useState } from "react";
import rock from "./images/piedra.png";
import scissors from "./images/tijera.png";
import paper from "./images/papel.png";
import player1 from "./images/comp1.svg";
import player2 from "./images/comp2.svg";
import player3 from "./images/comp3.svg";
import style from "./ppt.module.sass";

const PPTApp = () => {
  const options = [
    { src: rock, name: "piedra" },
    { src: scissors, name: "tijera" },
    { src: paper, name: "papel" }
  ];

  const players = [player1, player2, player3];

  const [option, setOption] = useState(null);
  const [selected, setSelected] = useState(null);
  const [final, setFinal] = useState(null);
  const [player, setPlayer] = useState(null);

  const handlePPT = opt => {
    const index = Math.floor(Math.random() * options.length);
    setOption(options[index]);
    setSelected(opt);
  };

  const handlePlayer = opt => {
    setPlayer(opt);
  };

  useEffect(() => {
    if (option !== null) {
      result(selected.name, option.name);
    }
  }, [option]);

  const result = (sel, op) => {
    if (
      (sel === "piedra" && op === "tijera") ||
      (sel === "tijera" && op === "papel") ||
      (sel === "papel" && op === "piedra")
    ) {
      setFinal("win");
    } else if (sel === op) {
      setFinal("tie");
    } else {
      setFinal("lose");
    }
  };

  const reset = () => {
    setOption(null);
    setSelected(null);
    setFinal(null);
  };

  const resetP = () => {
    setPlayer(null);
    setOption(null);
    setSelected(null);
    setFinal(null);
  };

  return (
    <div className={style.app}>
      {player === null && <h2>Elige con quien jugar</h2>}
      {player === null &&
        players.map(opt => (
          <img className={style.img} key={opt} src={opt} onClick={() => handlePlayer(opt)} />
        ))}
      {player !== null && selected === null && <h2>Elige una opción</h2>}
      {player !== null && (
        <div>
          {options.map((opt, i) => (
            <span className={selected !== null ? style.d_none : undefined} key={i}>
              <img
                onClick={() => handlePPT(opt)}
                className={`${style.img} ${style.img_options}`}
                alt={opt.name}
                src={opt.src}
              />
            </span>
          ))}
          {selected !== null && (
            <>
              <div className={style.d_flex}>
                <div>
                  <div className={style.d_flex}>
                    <div className={style.txt}>
                      <h3>
                        Elegiste:{" "}
                        <span className={`${style.bold} ${style.img_selected}`}>
                          {selected.name}
                        </span>
                      </h3>
                    </div>
                    <img
                      className={`${style.img} ${style.img_selected}`}
                      src={selected.src}
                      alt={selected.name}
                    />
                  </div>
                  <div className={style.d_flex}>
                    <img className={style.img} src={player} />
                    <div className={style.txt}>
                      <h3>Eligió:</h3>
                      <h3 className={`${style.bold} ${style.img_selected}`}>
                        <strong>{option.name}</strong>
                      </h3>
                    </div>
                    <img
                      className={`${style.img} ${style.img_selected}`}
                      src={option.src}
                      alt={option.name}
                    />
                  </div>
                </div>
              </div>
              <div>
                {final === "win" && (
                  <div className={style.d_flex}>
                    <img className={style.img} src={player} />
                    <div className={`${style.box} ${style.sb2} ${style.img_selected}`}>
                      Me ganaste.. Juguemos de nuevo
                    </div>
                  </div>
                )}
                {final === "tie" && (
                  <div className={style.d_flex}>
                    <img className={style.img} src={player} />
                    <div className={`${style.box} ${style.sb2} ${style.img_selected}`}>
                      Empatamos :)
                    </div>
                  </div>
                )}
                {final === "lose" && (
                  <div className={style.d_flex}>
                    <img className={style.img} src={player} />
                    <div className={`${style.box} ${style.sb2} ${style.img_selected}`}>
                      Gané! Juguemos otra vez
                    </div>
                  </div>
                )}
                {final !== null && (
                  <button className={style.btn} onClick={reset}>
                    Jugar de Nuevo
                  </button>
                )}
                {final !== null && (
                  <button className={style.btn} onClick={resetP}>
                    Elegir rival
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PPTApp;
