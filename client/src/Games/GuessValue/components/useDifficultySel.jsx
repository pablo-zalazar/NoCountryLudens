import { useState } from "react";
import styles from "./useDiff.module.sass";

export const useDifficultySel = () => {
    const [quantityOfValues, setQuantityOfValues] = useState(0);
    const [showMain, setShowMain] = useState(false);
    const [difficulty, setDifficulty] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        setQuantityOfValues(e.target[1].value);
        setShowMain(true);
        setDifficulty(e.target[0].value);
    }
    return {
        setQuantityOfValues,
        setShowMain,
        quantityOfValues,
        showMain,
        difficulty,
        render: (
            <form onSubmit={handleSubmit} className={styles.formStyle}>
                <h2>Elige la dificultad en la que deseas jugar</h2>
                <select className={styles.selectBox}>
                    <option className={styles.optionsBox} value="0">Fácil</option>
                    <option className={styles.optionsBox} value="1">Medio</option>
                    <option className={styles.optionsBox} value="2">Difícil</option>
                </select>
                <h2>Elige la cantidad de valores que quieres usar</h2>
                <select className={styles.selectBox}>
                    <option className={styles.optionsBox} value="2">2</option>
                    <option className={styles.optionsBox} value="3">3</option>
                </select>
                <button className={styles.buttonBox} type="submit">Confirmar</button>
            </form>
        )
    }
}