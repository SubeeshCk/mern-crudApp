import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function UserWithLogin() {
  const { currentUser } = useSelector(state => state.user);
  return currentUser ? <Navigate to="/" replace /> : <Outlet />;
}

export default UserWithLogin;