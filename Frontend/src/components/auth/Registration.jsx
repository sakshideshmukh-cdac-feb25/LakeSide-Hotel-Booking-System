import React, { useState } from "react";
import { registerUser } from "../utils/ApiFunctions";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./login.css";

const Registration = () => {
  const navigate = useNavigate(); // <-- Step 1: hook for redirect

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Yup validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Z]/, "At least one uppercase letter")
      .matches(/[0-9]/, "At least one number"),
  });

  const handleRegistration = async (values, { resetForm }) => {
    try {
      const result = await registerUser(values);
      setSuccessMessage(result);
      setErrorMessage("");
      resetForm();

      // ✅ Step 2: Redirect after short delay
      setTimeout(() => {
        navigate("/login"); // home page
      }, 2000); // optional 2s delay to show success message
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(`Registration error : ${error.message}`);
    }

    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 5000);
  };

  return (
    <div className="registration-page">
      <section className="registration-container shadow-lg">
        {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
        {successMessage && <p className="alert alert-success">{successMessage}</p>}

        <h2 className="registration-title">Create an Account</h2>

        <Formik
          initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleRegistration}
        >
          <Form>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <Field name="firstName" className="form-control" />
              <ErrorMessage name="firstName" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <Field name="lastName" className="form-control" />
              <ErrorMessage name="lastName" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <Field name="email" type="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>

            <div className="d-flex align-items-center justify-content-between">
              <button type="submit" className="btn btn-hotel">Register</button>
              <span className="ms-3 text-light">
                Already have an account?{" "}
                <Link to="/login" className="registration-link">Login</Link>
              </span>
            </div>
          </Form>
        </Formik>
      </section>
    </div>
  );
};

export default Registration;
