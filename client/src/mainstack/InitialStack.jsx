import { BrowserRouter, Routes, Route } from "react-router-dom";

import RequireAuth from "../Routing/RequireAuth.jsx";
import UserOptionsSection from "../components/MessageComponents/UserOptionsSection/index.jsx";
import ChatSection from "../components/MessageComponents/ChatSection/index.jsx";
import PredefinedMessagesSection from "../components/MessageComponents/PredefinedMessagesSection/index.jsx";
import ChallengesSection from "../components/MessageComponents/ChallengesSection/index.jsx";
import PageNotFound from "../screens/NotFound/PageNotFound.jsx";
import GameForm from "../components/PagesComponents/AdminPannel/GameForm/GameForm.jsx";
import GameList from "../components/PagesComponents/AdminPannel/GameList/GameList.jsx";
import {
  Home,
  Games,
  Account,
  SignUp,
  Login,
  AdminPannel,
  Notifications,
  Messages,
  Layout,
  Favourites
} from "../screens";
import SuccesRegister from "../screens/SignUp/SuccessRegister/SuccesRegister.jsx";
import Status500 from "../screens/Status500/Status500.jsx";

function InitalStack() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LAYOUT ROUTES */}
        <Route element={<Layout />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/games/:id" element={<Games />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/*" element={<PageNotFound />} />
          {/* PROTECTED ROUTES */}
          <Route element={<RequireAuth allowedRole="user" />}>
            <Route exact path="/account" element={<Account />} />

            <Route path="/messages/options" element={<UserOptionsSection />} />
            <Route path="/messages/chat" element={<ChatSection />} />
            <Route path="/messages/defaultMessages" element={<PredefinedMessagesSection />} />
            <Route path="/messages/challenge" element={<ChallengesSection />} />
          </Route>
          {/* PROTECTED ROUTES ONLY ADMIN */}
          <Route element={<RequireAuth allowedRole="admin" />}>
            <Route path="/admin" element={<AdminPannel />}>
              <Route index element={<GameList />} />
              <Route path="game-manage" element={<GameForm />} />
              <Route path="game-manage/:id" element={<GameForm />} />
            </Route>
          </Route>
        </Route>
        {/* ROUTES WITHOUT LAYOUT */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route exact path="/signup/success" element={<SuccesRegister />} />
        <Route exact path="/500" element={<Status500 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default InitalStack;
