import { useState, useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/slices/auth/authAction";
import { getUserLogged } from "../../redux/slices/user/userAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import sign from "../../../assets/sesion/login.png";
import arrow from "../../../assets/Icons/arrow.svg";

import styles from "../LogIn/login.module.sass";
import "bootstrap-icons/font/bootstrap-icons.css";
import SpinnerLoad2 from "../../components/PagesComponents/SpinnerLoad/SpinnerLoad2";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email invalido").required("Email requerido"),
  password: Yup.string().min(6, "Contraseña minimo 6 caracteres").required("Contraseña requerida")
});

const Login = () => {
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  // User from context
  const { userToken, userLogged, successAuth, errorAuth } = useSelector(state => state.auth);
  const { userInfo } = useSelector(state => state.user);
  const buttonRef = useRef();
  const dispatch = useDispatch();
  // Navigate handler
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (userToken) {
      if (!userInfo) {
        dispatch(getUserLogged(userLogged.id));
      }
      navigate("/");
    }
    if (userToken && userInfo) {
      dispatch(getUserLogged(userLogged.id));
      navigate(from, { replace: true });
    }
    if (errorAuth) {
      buttonRef.current.disabled = true;
      toast.error("Mail o contraseña incorrecta", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
      setTimeout(() => {
        setDisabled(false);
        buttonRef.current.disabled = false;
      }, 3000);
    }
  }, [successAuth, userToken, errorAuth]);

  const submitHandler = values => {
    setDisabled(true);
    buttonRef.current.disabled = true;
    dispatch(userLogin({ email: values.email, password: values.password }));
  };

  return (
    <div className={styles.container}>
      <Link to={"../"}>
        <img className={styles.arrow} src={arrow} alt="" />
      </Link>
      <img className={styles.img_desk} src={sign} alt="" />
      <div className={styles.formu}>
        <img
          className={styles.imagen}
          src="https://res.cloudinary.com/ddg3a37dp/image/upload/v1670522393/logo_dqkgai.png"
        />
        <p className={styles.description}>Inicia sesión para ingresar a tu cuenta</p>
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          validationSchema={LoginSchema}
          onSubmit={submitHandler}>
          {({ errors, touched }) => (
            <Form className={styles.form}>
              <Field className={styles.formfield} name="email" placeholder="Email" />
              {errors.email && touched.email ? (
                <div className={styles.formerrors}>{errors.email}</div>
              ) : null}
              <div className={styles.containercontraseña}>
                <Field
                  className={styles.formfieldcontraseña}
                  name="password"
                  placeholder="Contraseña"
                  type={!mostrarContraseña ? "password" : "text"}
                />
                <i
                  onClick={() => setMostrarContraseña(!mostrarContraseña)}
                  className="bi bi-eye-fill"
                  style={{
                    position: "absolute",
                    marginTop: "12px",
                    right: "10%",
                    fontSize: "18px"
                  }}></i>
              </div>
              {errors.password && touched.password ? (
                <div className={styles.formerrors}>{errors.password}</div>
              ) : null}
              <button ref={buttonRef} className={styles.formbutton} type="submit">
                {disabled ? <SpinnerLoad2 className={styles.spinner} /> : <p>Enviar</p>}
              </button>
              <div id="noexiste"></div>
            </Form>
          )}
        </Formik>
        <Link className={styles.crearcuenta} to={"../signup"}>
          No tienes Cuenta? Registrate
        </Link>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
};

export default Login;
