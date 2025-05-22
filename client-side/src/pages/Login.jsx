import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router";
import axiosInstance from "../api/axios";
import styles from "./style/login.module.css"; // Import CSS module
import { useFormik } from "formik";
import * as Yup from "yup";

function Login() {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [inputErrors, setInputErrors] = useState({
    email: false,
    password: false,
  });

  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value.trim();
    const passValue = passwordDom.current.value.trim();

    const errors = {
      email: !emailValue,
      password: !passValue,
    };
    setInputErrors(errors);

    if (errors.email || errors.password) {
      setMessage("Please provide all required information.");
      setMessageType("error");
      return;
    }

    try {
      const { data } = await axiosInstance.post("/users/login", {
        email: emailValue,
        password: passValue,
      });

      setMessage("Login Successful!");
      setMessageType("success");
      localStorage.setItem("token", data.token);
      navigate("/questions");
    } catch (error) {
      setMessage(
        error?.response?.data?.msg || "An error occurred. Please try again."
      );
      setMessageType("error");
    }
  }

  return (
    <section className={styles["login-section"]}>
      <div className={styles["login-box"]}>
        {message && (
          <div className={`${styles["form-message"]} ${styles[messageType]}`}>
            {message}
          </div>
        )}
        <h1 className={styles["login-title"]}>Login to your account</h1>
        <p className={styles["login-subtitle"]}>
          Don't have an account?
          <Link to="/register" className={styles["login-signin"]}>
            {" "}
            Create a new account
          </Link>
        </p>
        <form className={styles["login-form"]} onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <input
              id="email"
              ref={emailDom}
              type="email"
              placeholder="Your Email"
              className={`${styles["form-input"]} ${
                inputErrors.email ? styles["error"] : ""
              }`}
            />
          </div>
          <div className={styles["form-group"]}>
            <input
              id="password"
              ref={passwordDom}
              type="password"
              placeholder="Your Password"
              className={`${styles["form-input"]} ${
                inputErrors.password ? styles["error"] : ""
              }`}
            />
          </div>
          <button type="submit" className={styles["form-button"]}>
            Submit
          </button>
          {/* <Box sx={{ textAlign: "center", mt: 2 }}> */}
          <Link to="/forgot-password" variant="body2">
            Forgot password?
          </Link>
          {/* </Box> */}

          <Link to="/register" className={styles["form-link"]}>
            Create an account?
          </Link>
        </form>
      </div>
    </section>
  );
}

export default Login;
