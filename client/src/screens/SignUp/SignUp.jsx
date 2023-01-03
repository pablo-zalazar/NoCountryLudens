import { useState, useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../redux/slices/auth/authAction";
import signup from "../../../assets/sesion/signup.png";
import arrow from "../../../assets/Icons/arrow.svg";

import styles from "./signup.module.sass";
import "bootstrap-icons/font/bootstrap-icons.css";
import SpinnerLoad2 from "../../components/PagesComponents/SpinnerLoad/SpinnerLoad2";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, "Nombre de usuario minimo 5 caracteres")
    .max(20, "Nombre de usuario maximo 20 caracteres")
    .required("Nombre de usuario requerido"),
  email: Yup.string().email("Email invalido").required("Email requerido"),
  password: Yup.string().min(6, "Contraseña minimo 6 caracteres").required("Contraseña requerida"),
  passwordConfirmacion: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirmación requerida")
});

const SignUp = () => {
  const navigate = useNavigate();
  const { userLogged, successAuth, errorAuth } = useSelector(state => state.auth);
  const { userInfo } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const buttonRef = useRef();

  useEffect(() => {
    if (successAuth) {
      console.log("Registrado ");
      // navigate("/login");
      navigate("/signup/success");
    }
    if (userLogged && userInfo) {
      navigate("/");
    }
    if (errorAuth) {
      setDisabled(false);
      buttonRef.current.disabled = false;
      console.log(errorAuth);
      alert("ERROR");
    }
  }, [userLogged, successAuth]);

  const submit = values => {
    setDisabled(true);
    buttonRef.current.disabled = true;
    dispatch(
      registerUser({
        username: values.username,
        email: values.email,
        password: values.password
      })
    );
  };

  return (
    <div className={styles.container}>
      <Link to={"../"}>
        <img className={styles.arrow} src={arrow} alt="" />
      </Link>
      <img className={styles.img_desk} src={signup} alt="" />
      <div className={styles.formu}>
        <img
          className={styles.img}
          src="https://res.cloudinary.com/ddg3a37dp/image/upload/v1670522393/logo_dqkgai.png"
        />
        <p className={styles.description}>¡Crea tu cuenta y desafia a tus amigos!</p>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: ""
          }}
          validationSchema={SignupSchema}
          onSubmit={submit}>
          {({ errors, touched }) => (
            <Form className={styles.form}>
              <Field className={styles.formfield} name="username" placeholder="Nombre de usuario" />
              {errors.username && touched.username ? (
                <div className={styles.formerrors}>{errors.username}</div>
              ) : null}
              <Field className={styles.formfield} name="email" placeholder="E-mail" />
              {errors.email && touched.email ? (
                <div className={styles.formerrors}>{errors.email}</div>
              ) : null}
              <div className={styles.containerfield}>
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
              <div className={styles.containerfield}>
                <Field
                  className={styles.formfieldcontraseña}
                  name="passwordConfirmacion"
                  placeholder="Confirmar Contraseña"
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

              {errors.passwordConfirmacion && touched.passwordConfirmacion ? (
                <div className={styles.formerrors}>{errors.passwordConfirmacion}</div>
              ) : null}
              <button ref={buttonRef} className={styles.formbutton} type="submit">
                {disabled ? <SpinnerLoad2 className={styles.spinner} /> : <p>Crear cuenta</p>}
              </button>
            </Form>
          )}
        </Formik>
        <Link className={styles.iniciarsesion} to={"../login"}>
          Tienes Cuenta? Inicia sesión
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
