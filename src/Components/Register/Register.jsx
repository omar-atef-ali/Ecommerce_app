import { useFormik } from "formik";
import * as yup from "yup";
import api from "../../api";
import { Link, useNavigate } from "react-router-dom";
import {  useEffect, useState } from "react";
// import { useContext } from "react";
import toast from "react-hot-toast";
// import { userContext } from "../../context/userContext";
import style from "./Register.module.css";
import logo from '../../assets/02574a11-e65b-4322-9afc-0a8af45029da.jpg';

export default function Register() {
  // const { setemail } = useContext(userContext);
  let [showPassword, setShowPassword] = useState(false);
  let [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  ///////////////////////////////////////////////

  // const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (token) {
  //     // لو فيه توكن، يروح مباشرة على الهوم
  //     navigate("/home");
  //   }
  // }, [token, navigate]);

  ////////////////////////////////////////////////////////

  async function handleRegisterSubmit(values) {
    const { confirmPassword, ...dataToSend } = values;
    setIsLoading(true);
    try {
      let response = await api.post(`/Auth/register`, dataToSend);
      console.log(response);
      console.log(dataToSend);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.errors[1] ||
        "Something went wrong while registration.",
        {
          position: "top-center",
          duration: 4000,
          style: {
            background:
              "linear-gradient(to right, rgba(121, 5, 5, 0.9), rgba(171, 0, 0, 0.85))",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "16px 20px",
            color: "#ffffff",
            fontSize: "0.95rem",
            borderRadius: "5px",
            width: "300px",
            height: "60px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
          },
          iconTheme: {
            primary: "#FF4D4F",
            secondary: "#ffffff",
          },
        },
      );
    } finally {
      setIsLoading(false);
    }
  }

  let validationRegister = yup.object({
    firstName: yup
      .string()
      .required("")
      .min(3, "First Name must be at least 3 characters") // الحد الأدنى 3
      .max(100, "First Name must be at most 100 characters"),
    // .matches(/^[A-Za-z0-9]+$/, "First Name can only contain letters and numbers")

    lastName: yup
      .string()
      .required("")
      .min(3, "Last Name must be at least 3 characters") // الحد الأدنى 3
      .max(100, "Last Name must be at most 100 characters"),
    // .matches(/^[A-Za-z0-9]+$/, "Last Name can only contain letters and numbers")

    email: yup
      .string()
      .required("")
      .email("Invalid email address.")
      .min(5, "Email must be at least 5 characters long"),

    password: yup
      .string()
      .required("")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: yup
      .string()
      .required("")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    })

  let formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: handleRegisterSubmit,
    validationSchema: validationRegister,
    validateOnMount: true,
  });

  ///////////////////////////////////////////////////////////

  // const registerWithGoogle = () => {
  //   const clientId =
  //     "161944913172-r0bverum3lr3mp4pe3k77mqbq0ehgatg.apps.googleusercontent.com";
  //   const redirectUri = `https://finalgradapp.netlify.app/google/callback`;
  //   // const redirectUri = `http://localhost:5173/google/callback`;
  //   const scope = "openid email profile";
  //   const responseType = "code";

  //   const searchParams = new URLSearchParams(window.location.search);
  //   const redirectParam = searchParams.get('redirect') || '';
  //   const stateValue = redirectParam ? `register:${redirectParam}` : 'register';

  //   const authUrl =
  //     "https://accounts.google.com/o/oauth2/v2/auth?" +
  //     `client_id=${encodeURIComponent(clientId)}` +
  //     `&redirect_uri=${encodeURIComponent(redirectUri)}` +
  //     `&response_type=${encodeURIComponent(responseType)}` +
  //     `&scope=${encodeURIComponent(scope)}` +
  //     `&state=${encodeURIComponent(stateValue)}`;

  //   window.location.href = authUrl;
  // };

  return (
    <>
      <div className={`${style.page_container}`}>
        <div className={`${style.hero_section}`}>

          {/* <img className={`${style.background_image}`} src={imghero} alt="Background" /> */}
          <div className={`${style.hero_background}`}>
            {/* <img src={imghero} alt="" /> */}
          </div>

          <div className={`${style.form_card}`}>
            <div className={`${style.form_content}`}>
              <div className={`${style.form_header}`}>
                <div className={`${style.logoSection}`}>
                  <div className={`${style.logoImageContainer}`}>
                    <img src={logo} alt="Wed Logo" className={`${style.logoImage}`} onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }} />

                  </div>
                  <span className={`${style.logoLetters}`}>W E D</span>
                </div>
                <h1 className={`${style.form_title}`}>Create Account</h1>
                <p className={`${style.form_subtitle}`}>
                  Join the Wed family
                </p>
              </div>
          
              <form onSubmit={formik.handleSubmit}>
                <div className={`${style.form_row}`}>
                  <div className={`${style.form_field}`}>
                    <label
                      htmlFor="firstName"
                      className={`${style.form_label}`}
                    >
                      First Name
                    </label>
                    <div className={`${style.input_wrapper}`}>
                      <svg
                        className={`${style.input_icon}`}
                        viewBox="0 0 20.1667 21.0556"
                        fill="none"
                      >
                        <path
                          d="M10.0833 9.63889C13.0289 9.63889 15.4167 7.64905 15.4167 5.19445C15.4167 2.73985 13.0289 0.75 10.0833 0.75C7.13781 0.75 4.75 2.73985 4.75 5.19445C4.75 7.64905 7.13781 9.63889 10.0833 9.63889Z"
                          stroke="#717182"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19.4167 20.3056V18.0833C19.4167 16.9046 18.8548 15.7741 17.8546 14.9406C16.8544 14.1071 15.4978 13.6389 14.0833 13.6389H6.08333C4.66885 13.6389 3.31229 14.1071 2.3121 14.9406C1.3119 15.7741 0.75 16.9046 0.75 18.0833V20.3056"
                          stroke="#717182"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <input
                        id="firstName"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                        className={`${style.form_input}`}
                        type="text"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className={`${style.error_placeholder}`}>
                      {formik.touched.firstName && formik.errors.firstName && (
                        <div
                          className="text-danger"
                          style={{ fontSize: "0.8rem" }}
                        >
                          {formik.errors.firstName}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={`${style.form_field}`}>
                    <label htmlFor="lastName" className={`${style.form_label}`}>
                      Last Name
                    </label>
                    <div className={`${style.input_wrapper}`}>
                      <svg
                        className={`${style.input_icon}`}
                        viewBox="0 0 20.1667 21.0556"
                        fill="none"
                      >
                        <path
                          d="M10.0833 9.63889C13.0289 9.63889 15.4167 7.64905 15.4167 5.19445C15.4167 2.73985 13.0289 0.75 10.0833 0.75C7.13781 0.75 4.75 2.73985 4.75 5.19445C4.75 7.64905 7.13781 9.63889 10.0833 9.63889Z"
                          stroke="#717182"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19.4167 20.3056V18.0833C19.4167 16.9046 18.8548 15.7741 17.8546 14.9406C16.8544 14.1071 15.4978 13.6389 14.0833 13.6389H6.08333C4.66885 13.6389 3.31229 14.1071 2.3121 14.9406C1.3119 15.7741 0.75 16.9046 0.75 18.0833V20.3056"
                          stroke="#717182"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <input
                        id="lastName"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        className={`${style.form_input}`}
                        type="text"
                        placeholder="Enter your last name"
                      />
                    </div>
                    <div className={`${style.error_placeholder}`}>
                      {formik.touched.lastName && formik.errors.lastName && (
                        <div
                          className="text-danger mt-1"
                          style={{ fontSize: "0.8rem" }}
                        >
                          {formik.errors.lastName}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className={`${style.form_field} ${style.full_width}`}>
                  <label htmlFor="email" className={`${style.form_label}`}>
                    Email
                  </label>
                  <div className={`${style.input_wrapper}`}>
                    <svg
                      className={`${style.input_icon}`}
                      viewBox="0 0 16.5 13.5"
                      fill="none"
                    >
                      <path
                        d="M15.75 2.75L9.00675 7.04525C8.77792 7.17816 8.518 7.24817 8.25338 7.24817C7.98875 7.24817 7.72883 7.17816 7.5 7.04525L0.75 2.75"
                        stroke="#717182"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M0.75 0.75H15.75V12.75H0.75V0.75Z"
                        stroke="#717182"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <input
                      id="email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      className={`${style.form_input}`}
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className={`${style.error_placeholder}`}>
                    {formik.touched.email && formik.errors.email && (
                      <div
                        className="text-danger mt-1"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {formik.errors.email}
                      </div>
                    )}
                  </div>
                </div>



                <div className={`${style.form_field} ${style.full_width}`}>
                  <label htmlFor="password" className={`${style.form_label}`}>
                    Password
                  </label>
                  <div className={`${style.input_wrapper}`}>
                    <svg
                      className={`${style.input_icon}`}
                      viewBox="0 0 18 19"
                      fill="none"
                    >
                      <path
                        d="M5.25 8.75V5.75C5.25 4.75544 5.64509 3.80161 6.34835 3.09835C7.05161 2.39509 8.00544 2 9 2C9.99456 2 10.9484 2.39509 11.6517 3.09835C12.3549 3.80161 12.75 4.75544 12.75 5.75V8.75"
                        stroke="#717182"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.25 8.75H3.75C2.92157 8.75 2.25 9.42157 2.25 10.25V15.5C2.25 16.3284 2.92157 17 3.75 17H14.25C15.0784 17 15.75 16.3284 15.75 15.5V10.25C15.75 9.42157 15.0784 8.75 14.25 8.75Z"
                        stroke="#717182"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <input
                      id="password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      className={`${style.form_input}`}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className={`${style.eye_button}`}
                      type="button"
                    >
                      {showPassword ? (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M14.5002 14.795C14.8088 14.5187 14.8351 14.0446 14.5589 13.7359C14.2826 13.4273 13.8085 13.401 13.4998 13.6773L14.5002 14.795ZM10.3227 10.5002C10.599 10.1915 10.5727 9.71739 10.2641 9.44115C9.95543 9.1649 9.48129 9.19117 9.20504 9.49981L10.3227 10.5002ZM19.1153 15.0421C18.8029 15.314 18.7701 15.7878 19.0421 16.1002C19.3141 16.4126 19.7878 16.4453 20.1002 16.1734L19.1153 15.0421ZM9.18831 4.69699C8.79307 4.82092 8.57313 5.24179 8.69705 5.63703C8.82098 6.03227 9.24185 6.25221 9.63709 6.12829L9.18831 4.69699ZM6.90354 7.43556C7.25269 7.21269 7.35505 6.74898 7.13218 6.39984C6.90931 6.0507 6.4456 5.94833 6.09646 6.1712L6.90354 7.43556ZM17.5515 18.0471C17.9064 17.8335 18.021 17.3727 17.8075 17.0177C17.5939 16.6628 17.1331 16.5482 16.7782 16.7618L17.5515 18.0471ZM8.25 12C8.25 14.0711 9.92893 15.75 12 15.75V14.25C10.7574 14.25 9.75 13.2426 9.75 12H8.25ZM12 15.75C12.96 15.75 13.8372 15.3883 14.5002 14.795L13.4998 13.6773C13.1012 14.034 12.5767 14.25 12 14.25V15.75ZM9.20504 9.49981C8.61169 10.1628 8.25 11.04 8.25 12H9.75C9.75 11.4233 9.96602 10.8988 10.3227 10.5002L9.20504 9.49981ZM2.32608 14.6636C4.2977 16.738 7.84898 19.75 12 19.75V18.25C8.51999 18.25 5.35328 15.6713 3.41334 13.6302L2.32608 14.6636ZM21.6739 9.33641C19.7023 7.26198 16.151 4.25 12 4.25V5.75C15.48 5.75 18.6467 8.32869 20.5867 10.3698L21.6739 9.33641ZM21.6739 14.6636C23.1087 13.154 23.1087 10.846 21.6739 9.33641L20.5867 10.3698C21.4711 11.3004 21.4711 12.6996 20.5867 13.6302L21.6739 14.6636ZM3.41334 13.6302C2.52889 12.6996 2.52889 11.3004 3.41334 10.3698L2.32608 9.33641C0.891308 10.846 0.891307 13.154 2.32608 14.6636L3.41334 13.6302ZM20.1002 16.1734C20.6921 15.6581 21.2202 15.1409 21.6739 14.6636L20.5867 13.6302C20.1602 14.0789 19.6662 14.5624 19.1153 15.0421L20.1002 16.1734ZM12 4.25C11.0225 4.25 10.0801 4.41736 9.18831 4.69699L9.63709 6.12829C10.4042 5.88776 11.1948 5.75 12 5.75V4.25ZM6.09646 6.1712C4.57051 7.14527 3.28015 8.33259 2.32608 9.33641L3.41334 10.3698C4.31512 9.42098 5.51237 8.3236 6.90354 7.43556L6.09646 6.1712ZM12 19.75C14.0476 19.75 15.9403 19.0165 17.5515 18.0471L16.7782 16.7618C15.3131 17.6433 13.6886 18.25 12 18.25V19.75Z"
                            fill="currentColor"
                            fillOpacity="0.75"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M4.53033 3.46967C4.23744 3.17678 3.76256 3.17678 3.46967 3.46967C3.17678 3.76256 3.17678 4.23744 3.46967 4.53033L4.53033 3.46967ZM19.4697 20.5303C19.7626 20.8232 20.2374 20.8232 20.5303 20.5303C20.8232 20.2374 20.8232 19.7626 20.5303 19.4697L19.4697 20.5303ZM14.5002 14.795C14.8088 14.5187 14.8351 14.0446 14.5589 13.7359C14.2826 13.4273 13.8085 13.401 13.4998 13.6773L14.5002 14.795ZM10.3227 10.5002C10.599 10.1915 10.5727 9.71739 10.2641 9.44115C9.95543 9.1649 9.48129 9.19117 9.20504 9.49981L10.3227 10.5002ZM19.1153 15.0421C18.8029 15.314 18.7701 15.7878 19.0421 16.1002C19.3141 16.4126 19.7878 16.4453 20.1002 16.1734L19.1153 15.0421ZM9.18831 4.69699C8.79307 4.82092 8.57313 5.24179 8.69705 5.63703C8.82098 6.03227 9.24185 6.25221 9.63709 6.12829L9.18831 4.69699ZM6.90354 7.43556C7.25269 7.21269 7.35505 6.74898 7.13218 6.39984C6.90931 6.0507 6.4456 5.94833 6.09646 6.1712L6.90354 7.43556ZM17.5515 18.0471C17.9064 17.8335 18.021 17.3727 17.8075 17.0177C17.5939 16.6628 17.1331 16.5482 16.7782 16.7618L17.5515 18.0471ZM3.46967 4.53033L19.4697 20.5303L20.5303 19.4697L4.53033 3.46967L3.46967 4.53033ZM8.25 12C8.25 14.0711 9.92893 15.75 12 15.75V14.25C10.7574 14.25 9.75 13.2426 9.75 12H8.25ZM12 15.75C12.96 15.75 13.8372 15.3883 14.5002 14.795L13.4998 13.6773C13.1012 14.034 12.5767 14.25 12 14.25V15.75ZM9.20504 9.49981C8.61169 10.1628 8.25 11.04 8.25 12H9.75C9.75 11.4233 9.96602 10.8988 10.3227 10.5002L9.20504 9.49981ZM2.32608 14.6636C4.2977 16.738 7.84898 19.75 12 19.75V18.25C8.51999 18.25 5.35328 15.6713 3.41334 13.6302L2.32608 14.6636ZM21.6739 9.33641C19.7023 7.26198 16.151 4.25 12 4.25V5.75C15.48 5.75 18.6467 8.32869 20.5867 10.3698L21.6739 9.33641ZM21.6739 14.6636C23.1087 13.154 23.1087 10.846 21.6739 9.33641L20.5867 10.3698C21.4711 11.3004 21.4711 12.6996 20.5867 13.6302L21.6739 14.6636ZM3.41334 13.6302C2.52889 12.6996 2.52889 11.3004 3.41334 10.3698L2.32608 9.33641C0.891308 10.846 0.891307 13.154 2.32608 14.6636L3.41334 13.6302ZM20.1002 16.1734C20.6921 15.6581 21.2202 15.1409 21.6739 14.6636L20.5867 13.6302C20.1602 14.0789 19.6662 14.5624 19.1153 15.0421L20.1002 16.1734ZM12 4.25C11.0225 4.25 10.0801 4.41736 9.18831 4.69699L9.63709 6.12829C10.4042 5.88776 11.1948 5.75 12 5.75V4.25ZM6.09646 6.1712C4.57051 7.14527 3.28015 8.33259 2.32608 9.33641L3.41334 10.3698C4.31512 9.42098 5.51237 8.3236 6.90354 7.43556L6.09646 6.1712ZM12 19.75C14.0476 19.75 15.9403 19.0165 17.5515 18.0471L16.7782 16.7618C15.3131 17.6433 13.6886 18.25 12 18.25V19.75Z"
                            fill="currentColor"
                            fillOpacity="0.75"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div className={`${style.error_placeholder}`}>
                    {formik.touched.password && formik.errors.password && (
                      <div
                        className="text-danger mt-1"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {formik.errors.password}
                      </div>
                    )}
                  </div>

                  <p className={`${style.password_hint}`}>
                    Use at least 8 characters, including one uppercase letter,
                    one lowercase letter, one number, and one special character
                    (e.g. ! @ # $ % ^ & *).
                  </p>
                </div>

                <div className={`${style.form_field} ${style.full_width}`}>
                  <label
                    htmlFor="confirmPassword"
                    className={`${style.form_label}`}
                  >
                    Confirm Password
                  </label>
                  <div className={`${style.input_wrapper}`}>
                    <svg
                      className={`${style.input_icon}`}
                      viewBox="0 0 18 19"
                      fill="none"
                    >
                      <path
                        d="M5.25 8.75V5.75C5.25 4.75544 5.64509 3.80161 6.34835 3.09835C7.05161 2.39509 8.00544 2 9 2C9.99456 2 10.9484 2.39509 11.6517 3.09835C12.3549 3.80161 12.75 4.75544 12.75 5.75V8.75"
                        stroke="#717182"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.25 8.75H3.75C2.92157 8.75 2.25 9.42157 2.25 10.25V15.5C2.25 16.3284 2.92157 17 3.75 17H14.25C15.0784 17 15.75 16.3284 15.75 15.5V10.25C15.75 9.42157 15.0784 8.75 14.25 8.75Z"
                        stroke="#717182"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <input
                      id="confirmPassword"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                      className={`${style.form_input}`}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                    />
                    <button
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className={`${style.eye_button}`}
                      type="button"
                    >
                      {showConfirmPassword ? (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M14.5002 14.795C14.8088 14.5187 14.8351 14.0446 14.5589 13.7359C14.2826 13.4273 13.8085 13.401 13.4998 13.6773L14.5002 14.795ZM10.3227 10.5002C10.599 10.1915 10.5727 9.71739 10.2641 9.44115C9.95543 9.1649 9.48129 9.19117 9.20504 9.49981L10.3227 10.5002ZM19.1153 15.0421C18.8029 15.314 18.7701 15.7878 19.0421 16.1002C19.3141 16.4126 19.7878 16.4453 20.1002 16.1734L19.1153 15.0421ZM9.18831 4.69699C8.79307 4.82092 8.57313 5.24179 8.69705 5.63703C8.82098 6.03227 9.24185 6.25221 9.63709 6.12829L9.18831 4.69699ZM6.90354 7.43556C7.25269 7.21269 7.35505 6.74898 7.13218 6.39984C6.90931 6.0507 6.4456 5.94833 6.09646 6.1712L6.90354 7.43556ZM17.5515 18.0471C17.9064 17.8335 18.021 17.3727 17.8075 17.0177C17.5939 16.6628 17.1331 16.5482 16.7782 16.7618L17.5515 18.0471ZM8.25 12C8.25 14.0711 9.92893 15.75 12 15.75V14.25C10.7574 14.25 9.75 13.2426 9.75 12H8.25ZM12 15.75C12.96 15.75 13.8372 15.3883 14.5002 14.795L13.4998 13.6773C13.1012 14.034 12.5767 14.25 12 14.25V15.75ZM9.20504 9.49981C8.61169 10.1628 8.25 11.04 8.25 12H9.75C9.75 11.4233 9.96602 10.8988 10.3227 10.5002L9.20504 9.49981ZM2.32608 14.6636C4.2977 16.738 7.84898 19.75 12 19.75V18.25C8.51999 18.25 5.35328 15.6713 3.41334 13.6302L2.32608 14.6636ZM21.6739 9.33641C19.7023 7.26198 16.151 4.25 12 4.25V5.75C15.48 5.75 18.6467 8.32869 20.5867 10.3698L21.6739 9.33641ZM21.6739 14.6636C23.1087 13.154 23.1087 10.846 21.6739 9.33641L20.5867 10.3698C21.4711 11.3004 21.4711 12.6996 20.5867 13.6302L21.6739 14.6636ZM3.41334 13.6302C2.52889 12.6996 2.52889 11.3004 3.41334 10.3698L2.32608 9.33641C0.891308 10.846 0.891307 13.154 2.32608 14.6636L3.41334 13.6302ZM20.1002 16.1734C20.6921 15.6581 21.2202 15.1409 21.6739 14.6636L20.5867 13.6302C20.1602 14.0789 19.6662 14.5624 19.1153 15.0421L20.1002 16.1734ZM12 4.25C11.0225 4.25 10.0801 4.41736 9.18831 4.69699L9.63709 6.12829C10.4042 5.88776 11.1948 5.75 12 5.75V4.25ZM6.09646 6.1712C4.57051 7.14527 3.28015 8.33259 2.32608 9.33641L3.41334 10.3698C4.31512 9.42098 5.51237 8.3236 6.90354 7.43556L6.09646 6.1712ZM12 19.75C14.0476 19.75 15.9403 19.0165 17.5515 18.0471L16.7782 16.7618C15.3131 17.6433 13.6886 18.25 12 18.25V19.75Z"
                            fill="currentColor"
                            fillOpacity="0.75"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M4.53033 3.46967C4.23744 3.17678 3.76256 3.17678 3.46967 3.46967C3.17678 3.76256 3.17678 4.23744 3.46967 4.53033L4.53033 3.46967ZM19.4697 20.5303C19.7626 20.8232 20.2374 20.8232 20.5303 20.5303C20.8232 20.2374 20.8232 19.7626 20.5303 19.4697L19.4697 20.5303ZM14.5002 14.795C14.8088 14.5187 14.8351 14.0446 14.5589 13.7359C14.2826 13.4273 13.8085 13.401 13.4998 13.6773L14.5002 14.795ZM10.3227 10.5002C10.599 10.1915 10.5727 9.71739 10.2641 9.44115C9.95543 9.1649 9.48129 9.19117 9.20504 9.49981L10.3227 10.5002ZM19.1153 15.0421C18.8029 15.314 18.7701 15.7878 19.0421 16.1002C19.3141 16.4126 19.7878 16.4453 20.1002 16.1734L19.1153 15.0421ZM9.18831 4.69699C8.79307 4.82092 8.57313 5.24179 8.69705 5.63703C8.82098 6.03227 9.24185 6.25221 9.63709 6.12829L9.18831 4.69699ZM6.90354 7.43556C7.25269 7.21269 7.35505 6.74898 7.13218 6.39984C6.90931 6.0507 6.4456 5.94833 6.09646 6.1712L6.90354 7.43556ZM17.5515 18.0471C17.9064 17.8335 18.021 17.3727 17.8075 17.0177C17.5939 16.6628 17.1331 16.5482 16.7782 16.7618L17.5515 18.0471ZM3.46967 4.53033L19.4697 20.5303L20.5303 19.4697L4.53033 3.46967L3.46967 4.53033ZM8.25 12C8.25 14.0711 9.92893 15.75 12 15.75V14.25C10.7574 14.25 9.75 13.2426 9.75 12H8.25ZM12 15.75C12.96 15.75 13.8372 15.3883 14.5002 14.795L13.4998 13.6773C13.1012 14.034 12.5767 14.25 12 14.25V15.75ZM9.20504 9.49981C8.61169 10.1628 8.25 11.04 8.25 12H9.75C9.75 11.4233 9.96602 10.8988 10.3227 10.5002L9.20504 9.49981ZM2.32608 14.6636C4.2977 16.738 7.84898 19.75 12 19.75V18.25C8.51999 18.25 5.35328 15.6713 3.41334 13.6302L2.32608 14.6636ZM21.6739 9.33641C19.7023 7.26198 16.151 4.25 12 4.25V5.75C15.48 5.75 18.6467 8.32869 20.5867 10.3698L21.6739 9.33641ZM21.6739 14.6636C23.1087 13.154 23.1087 10.846 21.6739 9.33641L20.5867 10.3698C21.4711 11.3004 21.4711 12.6996 20.5867 13.6302L21.6739 14.6636ZM3.41334 13.6302C2.52889 12.6996 2.52889 11.3004 3.41334 10.3698L2.32608 9.33641C0.891308 10.846 0.891307 13.154 2.32608 14.6636L3.41334 13.6302ZM20.1002 16.1734C20.6921 15.6581 21.2202 15.1409 21.6739 14.6636L20.5867 13.6302C20.1602 14.0789 19.6662 14.5624 19.1153 15.0421L20.1002 16.1734ZM12 4.25C11.0225 4.25 10.0801 4.41736 9.18831 4.69699L9.63709 6.12829C10.4042 5.88776 11.1948 5.75 12 5.75V4.25ZM6.09646 6.1712C4.57051 7.14527 3.28015 8.33259 2.32608 9.33641L3.41334 10.3698C4.31512 9.42098 5.51237 8.3236 6.90354 7.43556L6.09646 6.1712ZM12 19.75C14.0476 19.75 15.9403 19.0165 17.5515 18.0471L16.7782 16.7618C15.3131 17.6433 13.6886 18.25 12 18.25V19.75Z"
                            fill="currentColor"
                            fillOpacity="0.75"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  <div className={`${style.error_placeholder}`}>
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <div
                          className="text-danger mt-1"
                          style={{ fontSize: "0.8rem" }}
                        >
                          
                          {formik.errors.confirmPassword}
                        </div>
                      )}
                  </div>
                </div>


                <button
                  type="submit"
                  className={`${style.signup_button}`}
                disabled={!(formik.isValid && formik.dirty) || isLoading}
                >
                  {isLoading ? (
                    <span
                      className="spinner-border spinner-border-sm text-light"
                      role="status"
                    />
                  ) : (
                    "Create Account"
                  )}
                  
                </button>
                <div className={`${style.divider}`}>
                  {/* <div className={`${style.divider_line}`}></div>
                  <span className={`${style.divider_text}`}>
                    Or Continue with
                  </span> */}
                  {/* <div className={`${style.divider_line}`}></div> */}
                </div>

                {/* <button
                  className={`${style.google_button}`}
                  // onClick={() => registerWithGoogle()}
                  type="button"
                >
                  <svg
                    className={`${style.google_icon}`}
                    viewBox="0 0 25.4994 25.5"
                    fill="none"
                  >
                    <path
                      d="M24.5355 10.59H12.9943V15.03H19.7475C19.6249 16.11 18.8875 17.79 17.2916 18.87C16.3089 19.59 14.8356 20.07 12.9943 20.07C8.88902 20.07 5.62773 16.6407 5.62773 12.63C5.62773 8.73267 9.07435 5.31 12.9943 5.31C15.3276 5.31 16.8009 6.27 17.7822 7.11L21.2208 3.75C19.1329 1.95 16.3089 0.75 12.9943 0.75C8.20636 0.75 4.03175 3.39 2.06645 7.35C1.20148 9.01858 0.75 10.8705 0.75 12.75C0.75 14.6295 1.20148 16.4814 2.06645 18.15C4.03175 22.11 8.20636 24.75 12.9943 24.75C16.3089 24.75 19.1329 23.67 21.0982 21.87C24.2981 19.07 25.2248 14.634 24.5355 10.59Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button> */}

                <p className={`${style.login_link}`}>
                  Already have an account? <a href="/login">Login</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
