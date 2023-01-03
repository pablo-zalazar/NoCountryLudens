import axios from "axios";
import { getToken } from "./localStorage.jsx";

const useServices = () => {
  // const BASE_URL = import.meta.env.VITE_API_URL;
  const BASE_URL = "http://localhost:8000";
  // const BASE_URL = "https://ludens-ihty4twr5-nocountry-ludens.vercel.app";

  const routeUrl = {
    auth: BASE_URL + "/api/auth",
    users: BASE_URL + "/api/users",
    games: BASE_URL + "/api/games",
    scores: BASE_URL + "/api/scores",
    images: BASE_URL + "/api/images",
    reviews: BASE_URL + "/api/reviews",
    friends: BASE_URL + "/api/friends",
    favorites: BASE_URL + "/api/favorites",
    notification: BASE_URL + "/api/notifications",
    chat: BASE_URL + "/api/chat",
    message: BASE_URL + "/api/message"
  };

  // For public  routes
  function api() {
    return axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  // For protected routes
  function apiProtected() {
    return axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getToken()}`
      },
      withCredentials: true
    });
  }

  // AUTH API CALLS
  const auth = {
    signup: data => api().post(`${routeUrl.auth}/signup`, data),
    login: data => api().post(`${routeUrl.auth}/login`, data),
    changePassword: (id, data) => apiProtected().post(`${routeUrl.auth}/changePassword/${id}`, data)
  };

  // USERS API CALLS
  const users = {
    getAll: () => api().get(`${routeUrl.users}/`),
    getAdmins: () => api().get(`${routeUrl.users}/admin`),
    getById: userId => api().get(`${routeUrl.users}/${userId}`),
    modify: (userId, data) => apiProtected().put(`${routeUrl.users}/${userId}`, data),
    remove: userId => apiProtected().delete(`${routeUrl.users}/${userId}`),
    privateData: userId => apiProtected().get(`${routeUrl.users}/${userId}/private`)
  };

  // GAMES API CALLS
  const games = {
    getAll: () => api().get(`${routeUrl.games}/`),
    create: (data, headerConfig) =>
      apiProtected().post(`${routeUrl.games}/`, data, headerConfig || null),
    getById: gameId => api().get(`${routeUrl.games}/${gameId}`),
    modify: (gameId, data, headerConfig) =>
      apiProtected().put(`${routeUrl.games}/${gameId}`, data, headerConfig || null),
    remove: gameId => apiProtected().delete(`${routeUrl.games}/${gameId}`),
    getReview: gameId => apiProtected().get(`${routeUrl.games}/review/${gameId}`),
    setReview: (gameId, data) => apiProtected().post(`${routeUrl.games}/review/${gameId}`, data)
  };

  // SCORES API CALLS
  const scores = {
    getByGame: gameId => api().get(`${routeUrl.scores}/${gameId}`),
    createInGame: (gameId, data) => apiProtected().post(`${routeUrl.scores}/${gameId}`, data)
  };

  // IMAGES API CALLS
  const images = {
    getAllByGame: gameId => api().get(`${routeUrl.images}/${gameId}`),
    getById: imageId => api().get(`${routeUrl.images}/${imageId}`),
    add: (gameId, data) => apiProtected().post(`${routeUrl.images}/${gameId}`, data),
    remove: id => apiProtected().delete(`${routeUrl.images}/${id}`)
  };

  // NOTIFICATIONS
  const notifications = {
    getNotifications: () => apiProtected().get(`${routeUrl.notification}`),
    deleteNotification: notificationId =>
      apiProtected().delete(`${routeUrl.notification}/${notificationId}`)
  };

  // FRIENDS
  const friends = {
    inviteFriend: friendId => apiProtected().post(`${routeUrl.friends}/invite/${friendId}`),
    acceptInvitation: friendId =>
      apiProtected().post(`${routeUrl.friends}/accept/${friendId}`, { accept: true }),
    refuseInvitation: friendId =>
      apiProtected().post(`${routeUrl.friends}/refuse/${friendId}`, { accept: false }),
    deleteFriend: friendId => apiProtected().delete(`${routeUrl.friends}/delete/${friendId}`),
    getFriendRequest: friendRequestId =>
      apiProtected().get(`${routeUrl.friends}/friendRequest/${friendRequestId}`)
  };

  // FAVOURITES
  const favorites = {
    getFavorites: () => apiProtected().get(`${routeUrl.favorites}/`),
    addRemoveFavorite: gameId => apiProtected().post(`${routeUrl.favorites}/${gameId}`)
  };

  // CHAT
  const chat = {
    getPhrases: () => apiProtected().get(`${routeUrl.chat}/phrases`),
    getChathistory: userId => apiProtected().get(`${routeUrl.chat}/${userId}`),
    setChathistory: (chatId, data) => apiProtected().post(`${routeUrl.chat}/${chatId}`, data),
    socketSend: (currentChannel, data) =>
      apiProtected().post(`${routeUrl.message}?channel=${currentChannel}`, data)
  };
  return {
    auth,
    users,
    games,
    scores,
    images,
    favorites,
    friends,
    notifications,
    chat
  };
};
export default useServices;
