// styles
import styles from "./gameList.module.sass";

export default function GameList({ gameList }) {
  const ACTION_TITLE = "Desafiar";
  return (
    <div className={styles.gamesContainer}>
      {gameList.map(({ title, cardImage }) => {
        return (
          <div className={styles.card} key={cardImage}>
            <div className={styles.cardImageContainer}>
              <img className={styles.cardImage} src={cardImage} alt="Ajedrez" />
              <span className={styles.cardTitle}>{title}</span>
            </div>
            <div className={styles.actionCard}>
              <p>{ACTION_TITLE}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
