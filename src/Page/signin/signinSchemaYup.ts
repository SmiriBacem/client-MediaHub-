import * as Yup from "yup";

/**
 * Ceci est la shcéma pour la connexion qui est passé au serveur node
 * @param {string} email
 * @param {string} password
 */
export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
