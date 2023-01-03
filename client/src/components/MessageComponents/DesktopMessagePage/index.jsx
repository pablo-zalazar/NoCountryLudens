// hooks
import { useSelector } from "react-redux";

// utils
import { CHAT_SETIONS } from "../utils/chatSetions";

// components
import UserOptionsSection from "../UserOptionsSection";
import PredefinedMessagesSection from "../PredefinedMessagesSection";
import ChallengesSection from "../ChallengesSection";
import FindFriendsSection from "../FindFriendsSection/index";
import ChatSection from "../ChatSection/index";

// styles
import styles from "./messagesDesktop.module.sass";

export default function DesktopMessagePage() {
  const firstSectionOfPage = useSelector(state => state.message.firstSectionOfPage);
  const secondSectionOfPage = useSelector(state => state.message.secondSectionOfPage);
  const thirdSectionOfPage = useSelector(state => state.message.thirdSectionOfPage);

  // const { currentUser } = useSelector(state => state.message);

  const SECTIONS = {
    [CHAT_SETIONS.chat]: ChatSection,
    [CHAT_SETIONS.predefinedMessages]: PredefinedMessagesSection,
    [CHAT_SETIONS.predefinedMessagesWithChallenge]: ChallengesSection,
    [CHAT_SETIONS.searchFriends]: FindFriendsSection,
    [CHAT_SETIONS.userOptions]: UserOptionsSection
  };

  const FirstSection = SECTIONS[firstSectionOfPage];
  const SecondSection = SECTIONS[secondSectionOfPage];
  const ThirdSection = SECTIONS[thirdSectionOfPage];

  return (
    <div className={styles.container}>
      <div className={styles.chatSections}>
        <FirstSection />
        {secondSectionOfPage && <SecondSection />}
        {/* <SecondSection /> */}
        {ThirdSection && <ThirdSection />}
      </div>
    </div>
  );
}
