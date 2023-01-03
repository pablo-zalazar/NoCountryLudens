import classes from "./SpinnerLoad.module.sass";

export default function SpinnerLoad2({ className }) {
  return (
    <div className={`${classes.container2} ${className}`}>
      <div className={classes.lds_ring2}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}