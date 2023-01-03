import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import Swal from "sweetalert2";
import styles from "./rompecabezas.module.sass";
import { useState } from "react";

export default function Rompecabezas() {
  const handleClick = () => {
    window.location.reload();
  };

  const [size, setSize] = useState(2);

  const handleChange = e => {
    console.log("row", e.target.value);
    setSize(e.target.value);
  };

  const [image, setImage] = useState(
    "https://static.vecteezy.com/system/resources/previews/007/098/279/non_2x/cartoon-funny-little-dog-sitting-vector.jpg"
  );

  const handleChangeImage = e => {
    console.log("image", e.target.value);
    setImage(e.target.value);
  };
  return (
    <div className={styles.container}>
      <JigsawPuzzle
        imageSrc={image}
        rows={size}
        columns={size}
        onSolved={() =>
          Swal.fire({
            title: "Lo terminaste!",
            text: "Felicidades! Prueba otro nivel",
            icon: "success",
            confirmButtonText: "Excelente!"
          })
        }
      />
      <div>
        <p onClick={handleClick} className={styles.button}>
          Volver a empezar
        </p>
        <select onChange={handleChange} className={styles.select}>
          <option value="2">Pequeño</option>
          <option value="4">Mediano</option>
          <option value="6">Grande</option>
        </select>
        <select className={styles.select} onChange={handleChangeImage}>
          <option value="https://static.vecteezy.com/system/resources/previews/007/098/279/non_2x/cartoon-funny-little-dog-sitting-vector.jpg">
            Perrito
          </option>
          <option value="https://img.freepik.com/premium-vector/cute-sea-turtle-cartoon_160606-137.jpg?w=2000">
            Tortuga
          </option>
          <option value="https://img.freepik.com/premium-vector/seahorse-cartoon-cute-animals-sea-horse_125446-453.jpg?w=2000">
            Caballito de mar
          </option>
          <option value="https://img.freepik.com/premium-vector/cute-ladybug-cartoon_33070-2634.jpg?w=2000">
            Ladybug
          </option>
        </select>
      </div>
    </div>
  );
}
