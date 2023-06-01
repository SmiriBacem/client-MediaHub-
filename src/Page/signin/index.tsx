import React from "react";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import makeToast from "../../components/Snackbar";
import { signin_user_api } from "../../api";
import { Link } from "react-router-dom";
import { validationSchema } from "./signinSchemaYup";

interface ISigninFormData {
  email: string;
  password: string;
}

const SigninForm: React.FC = () => {
  const queryClient = useQueryClient();

  // Appel de l'Api signin
  const signinMutation = useMutation((formData: ISigninFormData) =>
    axios.post(signin_user_api, formData)
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const signin = await signinMutation.mutateAsync(values);
        if (signin?.data?.token) {
          // Une  alerte se présente en haut et droite de la page
          makeToast("success", "Vous êtes dés maintenant connecter");
        }
        // faire un purge au formulaire
        formik.resetForm();
        queryClient.invalidateQueries("user");
        // connexion réussie
      } catch (error: any) {
        console.log('error',error)
        // connexion n'as pas réussie
        // si connexion est échoué ou un probléme une alerte se présente en haut et droite de la page
        makeToast("warning", error?.request?.status === 429 ? "Vous avez dépasser la limite du nombre de requêtes à une seule requête par seconde"  : error.response.data.message);
      }
    },
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="min-w-[50%] bg-white p-8 shadow-lg rounded-lg">
        <form onSubmit={formik.handleSubmit} className="w-full">
          <div className="mb-8">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2 w-full"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className={`form-input ${
                formik.errors.email && "border-red-500"
              } w-full border-gray-400 rounded-lg`}
            />
            {formik.errors.email && (
              <p className="text-red-500 text-xs italic">
                {formik.errors.email}
              </p>
            )}
          </div>
          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className={`form-input ${
                formik.errors.password && "border-red-500"
              } w-full`}
            />
            {formik.errors.password && (
              <p className="text-red-500 text-xs italic">
                {formik.errors.password}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={signinMutation.isLoading}
            >
              {signinMutation.isLoading ? "Chargement..." : "Se connecter"}
            </button>
          </div>
          <div className="w-full flex justify-center mt-8">
            <p className="text-gray-500	font-medium text-xs">
              <Link to="/signup">Pas encore inscrit ? Inscrivez-vous !</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
