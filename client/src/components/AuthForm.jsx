import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import * as Yup from "yup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthForm = ({ isLogin }) => {
  const [redirect, setRedirect] = useState(false);

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };
  const AuthFormSchema = Yup.object({
    username: isLogin
      ? null
      : Yup.string()
          .nullable()
          .min(5, "Username is too short!")
          .required("Username is required"),
    email: Yup.string().required("Email is required").email("Email is valid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });
  const submitHandler = async (values) => {
    const { username, email, password } = values;
    let END_POINT = `${import.meta.env.VITE_API}/register`;
    if (isLogin) {
      END_POINT = `${import.meta.env.VITE_API}/login`;
    }
    const response = await fetch(END_POINT, {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    const toastFire = (message) => {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    };
    if (response.status === 201 || response.status === 200) {
      setRedirect(true);
    } else if (response.status === 400) {
      const data = await response.json();
      const pickedMessage = data.errorMessage[0].msg;
      toastFire(pickedMessage);
    } else if (response.status === 401) {
      const data = await response.json();
      const pickedMessage = data.message;
      toastFire(pickedMessage);
    }
  };
  if (redirect) {
    return <Navigate to={isLogin ? "/" : "/login"} />;
  }
  return (
    <section>
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="Light"
      />
      <div className="flex items-center justify-between  ">
        <h1 className="text-2xl font-bold my-5 ">
          {isLogin ? "Login" : "Register"}
        </h1>
        <Link to={"/"}>
          <ArrowLeftIcon width={22} />
        </Link>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={AuthFormSchema}
        onSubmit={submitHandler}
      >
        {({ errors, touched, values }) => (
          <Form>
            {!isLogin && (
              <div className="mb-3">
                <label htmlFor="username" className="font-medium block">
                  Username
                </label>
                <Field
                  type="text"
                  name="username"
                  id="username"
                  className="text-lg border-2 border-teal-600 py-1 w-full  rounded-lg"
                />
                <div className="text-red-600 font-medium font-mono">
                  <ErrorMessage name="username" />
                </div>
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="email" className="font-medium block">
                Email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className="text-lg border-2 border-teal-600 py-1 w-full  rounded-lg"
              />
              <div className="text-red-600 font-medium font-mono">
                <ErrorMessage name="email" />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="font-medium block">
                Password
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                className="text-lg border-2 border-teal-600 py-1 w-full  rounded-lg"
              />
              <div className="text-red-600 font-medium font-mono">
                <ErrorMessage name="password" />
              </div>
            </div>
            <button
              type="submit"
              className="bg-teal-600 text-white py-3 font-medium w-full  rounded-md mt-2"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </Form>
        )}
      </Formik>
      <p className="text-center py-2">Or</p>
      {isLogin ? (
        <>
          <p className="text-center">
            Do not have an account?{"  "}
            <Link to={"/register"} className="text-teal-600">
              Register
            </Link>
          </p>
        </>
      ) : (
        <>
          <p className="text-center">
            Already have been account!{"  "}
            <Link to={"/login"} className="text-teal-600">
              Login
            </Link>
          </p>
        </>
      )}
    </section>
  );
};

export default AuthForm;
