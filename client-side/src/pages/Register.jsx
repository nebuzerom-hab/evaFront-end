import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import classes from "./style/register.module.css";
import axiosInstance from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.username.trim()) newErrors.username = true;
    if (!formData.firstname.trim()) newErrors.firstname = true;
    if (!formData.lastname.trim()) newErrors.lastname = true;
    if (!formData.email.includes("@")) newErrors.email = true;
    if (formData.password.length < 6) newErrors.password = true;
    if (!formData.agreeToTerms) newErrors.agreeToTerms = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Remove error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSuccess(null);

    try {
      const response = await axiosInstance.post("/users/register", formData);

      setSuccess("Registration successful!");
      setFormData({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        agreeToTerms: false,
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setErrors({
        general: error.response?.data?.message || "User already exists",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.form__wrapper}>
      <div className={classes.signup__container}>
        <h2 className={classes.join}>Join the network</h2>
        <p className={classes.all}>
          Already have an account?{" "}
          <Link to="/" className={classes.Signin}>
            Sign in
          </Link>
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? classes.errorBorder : ""}
          />

          <div className={classes.name__fields}>
            <input
              type="text"
              name="firstname"
              placeholder="First name"
              value={formData.firstname}
              onChange={handleChange}
              className={errors.firstname ? classes.errorBorder : ""}
            />

            <input
              type="text"
              name="lastname"
              placeholder="Last name"
              value={formData.lastname}
              onChange={handleChange}
              className={errors.lastname ? classes.errorBorder : ""}
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? classes.errorBorder : ""}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? classes.errorBorder : ""}
          />

          <div className={classes.checkbox__group}>
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className={errors.agreeToTerms ? classes.errorBorder : ""}
            />
            <label className={classes.terms}>
              I agree to the{" "}
              <a href="/privacy-policy" className={classes.pp_terms}>
                privacy policy
              </a>{" "}
              and{" "}
              <a href="/terms" className={classes.pp_terms}>
                terms of service
              </a>
              .
            </label>
          </div>

          {errors.general && (
            <span className={classes.error}>{errors.general}</span>
          )}
          {success && <span className={classes.success}>{success}</span>}

          <button type="submit" disabled={loading} className="buttonOver">
            {loading ? "Signing up..." : "Agree and Join"}
          </button>
          <h5 className={classes.account__user}>
            Already have an account?
            <Link to={"/"}> Login</Link>
          </h5>
        </form>
      </div>
    </div>
  );
}

export default Register;

// import axiosInstance from "../api/axios";
// import React, { useState, useContext } from "react";
// import classes from "./style/register.module.css";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// function Register() {
//   const [formData, setFormData] = useState({
//     username: "",
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//     agreeToTerms: false,
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.username.trim()) {
//       newErrors.username = true;
//     }
//     if (!formData.firstname.trim()) {
//       newErrors.firstname = true;
//     }
//     if (!formData.lastname.trim()) {
//       newErrors.lastname = true;
//     }
//     if (!formData.email.includes("@")) {
//       newErrors.email = true;
//     }
//     if (formData.password.length < 6) {
//       newErrors.password = true;
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLoading(true);
//     setSuccess(null);

//     try {
//       const response = await axiosInstance.post("/users/register", formData);

//       if (!response.ok) throw new Error("Failed to sign up");

//       setSuccess("Registration successful!");
//       setFormData({
//         username: "",
//         firstname: "",
//         lastname: "",
//         email: "",
//         password: "",
//         agreeToTerms: false,
//       });
//     } catch (error) {
//       setErrors({ general: error.message });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={classes.form__wrapper}>
//       <div className={classes.signup__container}>
//         <h2>Join the network</h2>
//         <p>
//           Already have an account?{" "}
//           <a href="/signin" className={classes.Signin}>
//             Sign In
//           </a>
//         </p>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//             className={errors.username ? classes.inputError : ""}
//           />
//           {errors.username && (
//             <span className={classes.error}>{errors.username}</span>
//           )}
//           <div className={classes.name__fields}>
//             <input
//               type="text"
//               name="firstname"
//               placeholder="First name"
//               value={formData.firstname}
//               onChange={handleChange}
//               className={errors.firstname ? classes.inputError : ""}
//             />
//             {errors.firstname && (
//               <span className={classes.error}>{errors.firstname}</span>
//             )}

//             <input
//               type="text"
//               name="lastname"
//               placeholder="Last name"
//               value={formData.lastname}
//               onChange={handleChange}
//               className={errors.lastname ? classes.inputError : ""}
//             />
//             {errors.lastname && (
//               <span className={classes.error}>{errors.lastname}</span>
//             )}
//           </div>

//           <input
//             type="email"
//             name="email"
//             placeholder="Email address"
//             value={formData.email}
//             onChange={handleChange}
//             className={errors.email ? classes.inputError : ""}
//           />
//           {errors.email && (
//             <span className={classes.error}>{errors.email}</span>
//           )}
//           <div className={classes.passwordWrapper}>
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               className={`${classes.inputField} ${
//                 errors.password ? classes.inputError : ""
//               }`}
//             />
//             <span
//               className={classes.eyeIcon}
//               onClick={() => setShowPassword((prev) => !prev)}
//             >
//               {showPassword ? <FaEye /> : <FaEyeSlash />}
//             </span>
//           </div>
//           <div>
//             <label className={classes.terms}>
//               I agree to the{" "}
//               <a href="/privacy-policy" className={classes.pp_terms}>
//                 privacy policy
//               </a>{" "}
//               and{" "}
//               <a href="/terms" className={classes.pp_terms}>
//                 terms of service
//               </a>
//               .
//             </label>
//           </div>
//           {errors.agreeToTerms && (
//             <span className={classes.error}>{errors.agreeToTerms}</span>
//           )}

//           {errors.general && (
//             <span className={classes.error}>{errors.general}</span>
//           )}
//           {success && <span className={classes.success}>{success}</span>}

//           <button type="submit" disabled={loading}>
//             {loading ? "Signing up..." : "Agree and Join"}
//           </button>
//           <h4 className={classes.account__user}>Already have an account?</h4>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Register;
