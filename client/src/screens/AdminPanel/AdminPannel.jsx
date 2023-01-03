import classes from "./adminPannel.module.sass";
import { Outlet } from "react-router-dom";

function AdminPannel() {
  return (
    <div className={classes.container}>
      <Outlet className={classes.outlet}></Outlet>
    </div>
  );
}

export default AdminPannel;
