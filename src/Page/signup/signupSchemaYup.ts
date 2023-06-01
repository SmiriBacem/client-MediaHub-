import * as Yup from "yup";

/**
 * Ceci est la schéma pour l'enregistrement qui est passé au serveur node avec ces paramétres
 * @param {string} email
 * @param {string} password
 * @param {string} name
 */
export const validationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });