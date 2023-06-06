import React from "react";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { ISignupFormData } from "./schemaSignup";
import makeToast from "../../components/Snackbar";
import { signup_user_api } from "../../api";
import { Link } from "react-router-dom";
import { validationSchema } from "./signupSchemaYup"

const SignupForm: React.FC = () => {
  const queryClient = useQueryClient();

  const signupMutation = useMutation((formData: ISignupFormData) =>
    axios.post(signup_user_api, formData)
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const signup = await signupMutation.mutateAsync(values);
        if (signup?.data?.message) {
          makeToast("success", signup?.data?.message);
        }
        formik.resetForm();
        queryClient.invalidateQueries("user");
        // Handle successful signup
      } catch (error: any) {
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
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nom & Prénom
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className={`form-input ${formik.errors.name && "border-red-500"} w-full border border-gray-400 rounded-lg`}
            />
            {formik.errors.name && (
              <p className="text-red-500 text-xs italic">
                {formik.errors.name}
              </p>
            )}
          </div>
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
              disabled={signupMutation.isLoading}
            >
              {signupMutation.isLoading ? "Chargement..." : "S'inscrire"}
            </button>
          </div>
          <div className="w-full flex justify-center mt-8">
            <div><p className="text-gray-500	font-medium text-xs"><Link to="/signin">Connectez vous !</Link></p></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
