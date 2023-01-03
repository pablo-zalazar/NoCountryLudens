// components
import FriendsList from "../FriendsList";
import SearchInput from "../SearchInput";
import ListOfLastMessages from "../ListOfLastMessages";
import HeaderDesktop from "../HeaderDesktop";

// hooks
import { useEffect, useState } from "react";

// constantes
// import { FRIENDS } from "../utils/friendsList";

// styles
import styles from "./searchWraper.module.sass";
import { useSelector } from "react-redux";
import useServices from "../../../services/useServices";

export default function FindFriendsSection() {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { users } = useServices();
  const { userInfo } = useSelector(state => state.user);

  useEffect(() => {
    (async () => {
      const { data } = await users.getAll();
      if (userInfo) {
        const friends = [];
        const otherUsers = [];
        data.users.forEach(elem => {
          if (elem._id !== userInfo.id)
            userInfo.friends.includes(elem._id) ? friends.push(elem) : otherUsers.push(elem);
        });
        // console.log(friendsArray);
        setAllUsers([...friends, ...otherUsers]);
      }

      setIsLoading(false);
    })();
  }, [userInfo]);

  const handlesSearchFriend = key => {
    const listOfFriend = allUsers.filter(({ name }) => {
      const letters = key.target.value;
      return name.includes(letters);
    });
    setAllUsers(listOfFriend);
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <p>Cargando</p>
      ) : (
        <>
          <HeaderDesktop
            showUserImage={false}
            showArrow={false}
            isTitleCenter={true}
            title="Amigos"
          />
          {allUsers.length > 0 && <FriendsList friendsList={allUsers} />}

          <SearchInput handledSearch={handlesSearchFriend} placeholder="Buscar jugadores" />
          <ListOfLastMessages messageList={allUsers} />
        </>
      )}
    </div>
  );
}
