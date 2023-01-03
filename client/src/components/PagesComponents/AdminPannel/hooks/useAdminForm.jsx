import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGameById from "./useGameById";

function useAdminForm(id, initValues) {
  const navigate = useNavigate();

  // Form states
  const [file, setFile] = useState();
  const [thumbnail, setThumbnail] = useState(false);

  const { game, submitMyForm, setLoadGame, setSubmitProcess } = useGameById(id, initValues);

  // Load game by Id handle on hook

  useEffect(() => {
    setThumbnail(game?.cover?.path);
  }, [game]);
  // Functions

  // Event Handler for Preview Image
  const loadImagePreviewHandler = e => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setThumbnail(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setFile(e.target.files[0]);
    } else {
      setThumbnail(initValues.imageUrl);
    }
  };

  // Cancel Event Handler
  const cancelHandler = e => {
    e.preventDefault();
    setFile(false);
    navigate("/admin");
  };

  // Validation handler
  const onValidate = values => {
    const errors = {};
    switch (true) {
      case !values.name:
        errors.name = "El nombre del juego es obligatorio";
        break;
      case values.name && !/^[a-zA-ZÀ-ÿ]([a-zA-ZÀ-ÿ\s,[0-9]){1,40}$/.test(values.name):
        errors.name = "El nombre del juego debe ser de 1 a 40 caracteres";
        break;
      case !values.devices.length:
        errors.devices = "Debes elegir al menos una opción";
        break;
      case !values.audiencies:
        errors.devices = "Debes elegir una opción";
        break;
      case !values.comingSoon:
        errors.devices = "Debes elegir una opción";
        break;
      case !values.comingSoon && !values.folder:
        errors.folder = "La carpeta es obligatoria";
        break;
      case !values.comingSoon && !/^[a-zA-ZÀ-ÿ_0-9]{1,40}$/.test(values.folder):
        errors.folder =
          "El nombre del juego no puede contener espacios ni signos salvo el guión bajo.";
        break;
      case !values.description:
        errors.description = "Debes ingresar una descripción del juego";
        break;
      case values.description && values.description.length > 300:
        errors.description = "No puedes ingresar mas de 300 caracteres";
        break;
    }
    return errors;
  };

  const createFormData = values => {
    const newSubmit = new FormData();
    newSubmit.append("name", values.name);
    newSubmit.append("description", values.description);
    newSubmit.append("audiencies", values.audiencies);
    newSubmit.append("devices", values.devices);
    newSubmit.append("folder", values.folder);
    newSubmit.append("comingSoon", values.comingSoon);
    if (file) {
      newSubmit.append("image", file);
    } else {
      if (!id) {
        throw new Error("El archivo es requerido");
      }
    }
    return newSubmit;
  };

  // Event Handler for submit form
  const submitHandler = (values, { resetForm }) => {
    try {
      const newForm = createFormData(values);
      setSubmitProcess(true);
      submitMyForm(newForm);
      setLoadGame(true);
      setThumbnail(false);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    submitHandler,
    cancelHandler,
    loadImagePreviewHandler,
    onValidate,
    thumbnail
  };
}

export default useAdminForm;
