// Local Storage for JWT tokens manage

// Get Token from local storage
export const getToken = () => {
  const local = JSON.parse(localStorage.getItem("userToken"));
  return local && local.auth ? local.auth : null;
};

// Get User Information from local storage (role and id)
export const getUserLogged = () => {
  const local = JSON.parse(localStorage.getItem("userToken"));
  return local && local.user?.id && local.user?.role
    ? { id: local.user.id, role: local.user.role }
    : false;
};

// Add credentials to local storage
export const addLocal = data => localStorage.setItem("userToken", JSON.stringify(data));

// Remove credentials from local storage
export const removeLocal = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("EstadoPorDefecto");
};
