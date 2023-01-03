import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const RequireAuth = ({ allowedRole }) => {
  const { userLogged } = useSelector(state => state.auth);
  const location = useLocation();

  if (!userLogged) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if ((userLogged && userLogged.role === "admin") || (userLogged && allowedRole !== "admin")) {
    return <Outlet />;
  }
  if (userLogged && userLogged.role === "user" && allowedRole === "admin") {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
  console.log("Role not allowed");
};
export default RequireAuth;

RequireAuth.propTypes = {
  allowedRole: PropTypes.string.isRequired
};
