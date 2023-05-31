import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { ISignupFormData } from "./schemaSignup";
import makeToast from "../../Components/Snackbar";
import "./style.css";
import { signup_user_api } from "../../api";

const SignupForm: React.FC = () => {
  const queryClient = useQueryClient();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

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
        makeToast("warning", error.response.data.message);
      }
    },
  });

  return (
    <div className="flex items-center justify-center h-screen signup">
      <div className="min-w-[50%] bg-white p-8 shadow-lg rounded-lg">
        <form onSubmit={formik.handleSubmit} className="w-full max-w-sm">
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
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
