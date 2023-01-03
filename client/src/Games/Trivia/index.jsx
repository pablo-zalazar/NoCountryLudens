// components
import OptionsContainer from "./components/OptionsContainer";

// styles
import styles from "./triavia.module.sass";

export default function TriviaPage() {
  return (
    <div className={styles.containerPageOfTrivia}>
      <main className={styles.container}>
        <OptionsContainer questionsNumber={3} />
      </main>
    </div>
  );
}
