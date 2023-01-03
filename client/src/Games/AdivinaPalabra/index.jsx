import { useState, useEffect } from "react";
import Boton from "./Botones/Boton";
import BotonJugar from "./BotonJugar/BotonJugar";
import classes from "../AdivinaPalabra/adivinaPalabra.module.sass";

const AdivinaPalabra = () => {
  const letras = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "ñ",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ];
  const palabrasArray = [
    "manzana",
    "trueno",
    "etiqueta",
    "zafiro",
    "afuera",
    "rodar",
    "hueso",
    "pulpo",
    "arrestar",
    "tortilla",
    "semana",
    "sofocar",
    "horrible",
    "sombrero",
    "beisbol",
    "europa",
    "alrededor",
    "cianuro",
    "fiscal",
    "circo",
    "apresar",
    "eludir",
    "sonambulo",
    "proyecto",
    "diario",
    "lubricante",
    "examen",
    "contagioso",
    "alfajor",
    "humor",
    "abejas",
    "pulsera",
    "venda",
    "ocupar",
    "golosinas",
    "roca",
    "desperdiciar",
    "robo",
    "corta"
  ];
  const [palabra, setPalabra] = useState(0);
  const [errores, setErrores] = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [cantidadErrores, setCantidadErrores] = useState(7);
  let cantAciertos = 0;
  let palabraAdivinar;
  let acerto;
  // eslint-disable-next-line no-unused-vars
  let erro;

  function setearJuego() {
    setCantidadErrores(7);
    setErrores(0);
    setAciertos(0);
    cantAciertos = 0;
    palabraAdivinar = undefined;
    setPalabra(undefined);
  }

  function empezarJuego() {
    setearJuego();

    const numRandom = random();
    const palab = palabrasArray[numRandom];
    palabraAdivinar = palab;
    setPalabra(palabraAdivinar);

    const contenedor = document.getElementById("contenedor-palabra");
    contenedor.innerHTML = "";

    for (let i = 0; i < palabraAdivinar.length; i++) {
      const span = document.createElement("span");
      contenedor.appendChild(span);
    }
  }

  console.log(palabra);

  function random() {
    const random = Math.floor(Math.random() * palabrasArray.length);
    return random;
  }

  function clickLetras(e) {
    const boton = e.target;
    boton.disabled = true;
    const spans = document.querySelectorAll("span");

    acerto = false;
    erro = false;
    for (let i = 0; i < palabra.length; i++) {
      const letra = boton.innerHTML.toLowerCase();
      if (letra === palabra[i]) {
        spans[i].innerHTML = letra;
        acerto = true;
        cantAciertos++;
        setAciertos(aciertos + cantAciertos);
      }
    }
    cantAciertos = 0;

    if (acerto === false) {
      setErrores(errores + 1);
      setCantidadErrores(cantidadErrores - 1);
    }
  }

  useEffect(() => {
    if (aciertos === palabra.length) {
      const container = document.getElementById("contenedor-palabra");
      container.innerHTML = `Haz ganado,<br> la palabra era ${palabra}`;
      setPuntaje(puntaje + 10);
      setPalabra(0);
    }
    if (errores === 7) {
      const container = document.getElementById("contenedor-palabra");
      container.innerHTML = `La palabra era ${palabra},<br> intenta denuevo`;
      setPalabra(0);
    }
  }, [aciertos, errores]);

  return (
    <div className={classes.container}>
      {palabra !== 0 && (
        <div>
          <p className={classes.container_errores}>{cantidadErrores}</p>
          <h2 className={classes.container_intentos}>Intentos</h2>
        </div>
      )}
      <div id="contenedor-palabra" className={classes.contenedor_palabra}></div>
      <div className={classes.container_botones}>
        {palabra !== 0 &&
          letras.map((letra, index) => {
            return <Boton letra={letra} key={index} id={index} clickLetras={clickLetras} />;
          })}
      </div>
      {palabra === 0 && <BotonJugar jugar={"Jugar"} empezarJuego={empezarJuego} />}
      <p className={classes.container_puntaje}>Puntaje: {puntaje}</p>
    </div>
  );
};

export default AdivinaPalabra;
