import classes from "./gameForm.module.sass";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import MessageValidation from "../../ErrorValidation/ErrorValidation.jsx";
import SuccessMessage from "../SuccessMessage/SuccessMessage.jsx";
import SpinnerLoad from "../../SpinnerLoad/SpinnerLoad";
import useGameById from "../hooks/useGameById";
import useAdminForm from "../hooks/useAdminForm";

// icon import
import {
  todopublico,
  plus3,
  plus7,
  mouse,
  gamepad,
  keyboard,
  defaultImage
} from "../../../../../assets";

function GameForm() {
  const id = useParams().id;
  // constants
  const initValues = {
    name: "",
    description: "",
    imageUrl: false,
    devices: [],
    audiencies: "",
    comingSoon: true,
    folder: ""
  };

  // UseGameById manage load and save for game
  const { loadGame, game, successSubmit, submitProcess } = useGameById({ id, initValues });

  // UseAdminForm has all the form logic
  const { submitHandler, onValidate, cancelHandler, loadImagePreviewHandler, thumbnail } =
    useAdminForm({ id, initValues });

  if (successSubmit) {
    return (
      <div className={classes.container}>
        <SuccessMessage
          gameName={successSubmit.name || "Game"}
          coverGame={successSubmit.cover.path || defaultImage}
        />
      </div>
    );
  } else if (loadGame) {
    if (successSubmit) {
      console.log(!!successSubmit);
    }
    console.log(submitProcess);
    return (
      <div className={classes.container}>
        <SpinnerLoad />
      </div>
    );
  } else {
    return (
      <div className={classes.container}>
        <Formik initialValues={game || initValues} onSubmit={submitHandler} validate={onValidate}>
          {({ values, errors }) => {
            return (
              <Form className={classes.form} encType="multipart/form-data">
                <div className={classes.form_container}>
                  <div className={classes.form_wrapper}>
                    <div className={classes.form_area}>
                      <div className={classes.form_name}>
                        <p className={classes.section_title}>Nombre del juego</p>
                        <div className={classes.group_form}>
                          <Field
                            type="text"
                            name="name"
                            placeholder="Escribe el nombre del Juego"
                          />
                          <ErrorMessage
                            name="name"
                            component={() => (
                              <MessageValidation className={classes.errors} message={errors.name} />
                            )}
                          />
                        </div>
                      </div>

                      <div className={classes.form_radio}>
                        <p className={classes.section_title}>Características</p>
                        <p>Selecciona una de ellas: </p>
                        <div className={classes.group_form}>
                          <Field type="radio" name="audiencies" id="tp" value="tp" />
                          <label htmlFor="tp" className={classes.radio_label}>
                            <img src={todopublico} alt="imágen de ícono TP" />
                            <span>Apto para todo público</span>
                          </label>
                        </div>
                        <div className={classes.group_form}>
                          <Field type="radio" name="audiencies" id="plus3" value="+3" />
                          <label htmlFor="plus3" className={classes.radio_label}>
                            <img src={plus3} alt="imágen de ícono +3" />
                            <span>Mayores de 3 años</span>
                          </label>
                        </div>
                        <div className={classes.group_form}>
                          <Field type="radio" name="audiencies" value="+7" id="plus7" />
                          <label htmlFor="plus7" className={classes.radio_label}>
                            <img src={plus7} alt="imágen de ícono +7" />
                            <span>Mayores de 7 años</span>
                          </label>
                        </div>
                        <ErrorMessage
                          name="audiencies"
                          component={() => (
                            <MessageValidation
                              className={classes.errors}
                              message={errors.audiencies}
                            />
                          )}
                        />
                      </div>

                      <div className={classes.form_checkbox}>
                        <p>Selecciona todas las que el juego contenga</p>
                        <div className={classes.group_form}>
                          <Field type="checkbox" name="devices" id="keyboard" value="keyboard" />
                          <label htmlFor="keyboard" className={classes.checkbox_label}>
                            <img src={keyboard} alt="imágen de ícono teclado" />
                            <span>Accepta Teclado</span>
                          </label>
                        </div>
                        <div className={classes.group_form}>
                          <Field type="checkbox" name="devices" id="gamepad" value="gamepad" />
                          <label htmlFor="gamepad" className={classes.checkbox_label}>
                            <img src={gamepad} alt="imágen de ícono gamepad" />
                            <span>Accepta Gamepad</span>
                          </label>
                        </div>
                        <div className={classes.group_form}>
                          <Field type="checkbox" name="devices" id="mouse" value="mouse" />
                          <label htmlFor="mouse" className={classes.checkbox_label}>
                            <img src={mouse} alt="imágen de ícono mouse" />
                            <span>Accepta Mouse</span>
                          </label>
                        </div>
                        <ErrorMessage
                          name="devices"
                          component={() => (
                            <MessageValidation
                              className={classes.errors}
                              message={errors.devices}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className={classes.form_images}>
                      <p className={classes.section_title}>Imágen</p>
                      <div className={classes.group_form}>
                        <label htmlFor="imageGame">
                          <img
                            src={thumbnail || defaultImage}
                            className={thumbnail ? null : classes.default}
                            alt="imágen del juego"
                          />
                        </label>
                        <input
                          type="file"
                          onChange={loadImagePreviewHandler}
                          name="imageGame"
                          id="imageGame"
                          accept=".jpeg,.png,.webp,.jpg"
                          hidden
                        />
                      </div>
                    </div>
                  </div>
                  <div className={classes.form_description}>
                    <p className={classes.section_title}>Description</p>
                    <Field
                      as="textarea"
                      name="description"
                      placeholder="Describe tu juego en un límite de 300 caracteres."
                    />
                    <ErrorMessage
                      name="description"
                      component={() => (
                        <MessageValidation
                          className={classes.errors}
                          message={errors.description}
                        />
                      )}
                    />
                  </div>

                  <div className={classes.form_next}>
                    <div className={classes.group_form}>
                      <Field type="checkbox" name="comingSoon" id="comingSoonid" />
                      <label htmlFor="comingSoonid" className={classes.checkbox_label}>
                        Este juego saldrá próximamente
                      </label>
                    </div>
                  </div>
                  <div
                    className={`${classes.form_folder} ${
                      !values.comingSoon ? classes.open : null
                    }`}>
                    <p className={classes.section_title}>Datos de carga</p>
                    <div className={classes.group_form}>
                      <Field
                        type="text"
                        name="folder"
                        placeholder="Ubicación del juego (carpeta)"
                        disabled={values.comingSoon}
                      />
                      <ErrorMessage
                        name="folder"
                        component={() => (
                          <MessageValidation className={classes.errors} message={errors.folder} />
                        )}
                      />
                    </div>
                  </div>

                  <div className={classes.form_footer}>
                    <button className={classes.cancel} type="reset" onClick={cancelHandler}>
                      Cancelar
                    </button>
                    <button className={classes.submit} type="submit">
                      Publicar
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

export default GameForm;
