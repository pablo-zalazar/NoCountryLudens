import { useState } from "react"
import { Link } from "react-router-dom";
import { useDifficultySel } from "./components/useDifficultySel";
import { createOperation, processOperation, analizeOperation } from "./Utils/getMathOperation";
import styles from './guessValue.module.sass'
const GuessValue = () => {
    let [success, setSuccess] = useState(0);
    const [showFinal, setShowFinal] = useState(false);
    let { quantityOfValues, setQuantityOfValues, setShowMain, difficulty, showMain, render } = useDifficultySel();
    const { hiddenValue, values } = processOperation(createOperation(quantityOfValues, difficulty));
    const handleSubmit = (e) => {
        e.preventDefault();
        let inputValue = e.target[0].value;
        const validatedInput = analizeOperation(inputValue, hiddenValue);
        if (validatedInput) {
            setSuccess(success + 1);
            e.target[0].value = '';
        } else {
            setShowMain(false);
            setShowFinal(true);
        }
    }
    const handlePlayAgain = () => {
        setQuantityOfValues(0);
        setShowFinal(false);
    }
    return (
        <div style={{ width: "100%", height: "100%", justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center", background: "linear-gradient(180deg, #0C0E18 0%, #292759 100%)" }}>
            {!quantityOfValues && !showMain &&
                render
            }{showMain && !showFinal &&
                <form className={styles.formBox} onSubmit={handleSubmit}>
                    <div className={styles.divBox}>
                        {values.map((item, index) => {
                            if (item == "hidden") {
                                return (<input className={styles.inputBox} key={index} type="text" />)
                            }
                            return ` ${item} `
                        })}
                    </div>
                    <button className={styles.buttonBox} type='submit'>Validar</button>
                </form>
            }{showFinal &&
                <div className={styles.newDivBox}>
                    <h2>Se ha acabado el juego y lograste <span className={styles.successBox}>{success}</span> Aciertos</h2>
                    <div style={{ display: "flex", alignSelf: "center", gap: "1em" }}>
                        <button className={styles.newButtonBox} onClick={handlePlayAgain}>Volver a Jugar</button>
                        <Link to="/">
                            <button className={styles.newButtonBox}>Ir al menú principal</button></Link>
                    </div>
                </div>
            }

        </div >
    )
}

export default GuessValue;