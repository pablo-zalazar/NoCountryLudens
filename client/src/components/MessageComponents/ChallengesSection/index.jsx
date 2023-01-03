// hooks
import { useDispatch } from "react-redux";
import { setThirdSectionOfPage } from "../../../redux/slices/messages/messagesSlice";
import { useState } from "react";

// hocs
import messagesResponsive from "../../../hocs/messageResponsive";

// components
import SearchInput from "../SearchInput/index";
import GameList from "../GameList";
import DefaultMessagesHeader from "../DefaultMessageHeader";

// utils
import { CHAT_SETIONS } from "../utils/chatSetions";
import { GAME_LIST } from "../utils/gameList";

// styles
import styles from "./challenge.module.sass";

function ChallengesSection() {
  const [game, setGame] = useState(GAME_LIST);
  const SELECT_CHALLENGE = "Elige el juego con cual quieres desafiar";
  const RECOMMENDATIONS = "Recomendaciones:";
  const TITLE = "Desafía un juego";

  const dispatch = useDispatch();

  const toBack = () => dispatch(setThirdSectionOfPage(CHAT_SETIONS.predefinedMessages));

  const handledSearchGame = key => {
    const listOfFriend = GAME_LIST.filter(({ title }) => {
      const letters = key.target.value;
      return title.includes(letters);
    });
    setGame(listOfFriend);
  };

  return (
    <div className={styles.container}>
      <div className={styles.message}>
        <DefaultMessagesHeader title={TITLE} className={styles.header} handledPage={toBack} />
        <p className={styles.title}>{SELECT_CHALLENGE}</p>
        <SearchInput placeholder="Buscar juego" handledSearch={handledSearchGame} />
        <p className={styles.title}>{RECOMMENDATIONS}</p>
        <GameList gameList={game} />
      </div>
    </div>
  );
}

export default messagesResponsive(ChallengesSection);
