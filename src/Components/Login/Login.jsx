
import React, { useContext, useEffect, useState } from "react";
import style from "./Login.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import api from "../../api";
import toast from "react-hot-toast";
import * as yup from "yup";

import logo from '../../assets/02574a11-e65b-4322-9afc-0a8af45029da.jpg';


export default function Login() {
  let navigate = useNavigate();
  let location = useLocation();

  let [loading, setLoading] = useState(false);
  // let { setUserToken } = useContext(userContext);

  let [showPassword, setShowPassword] = useState(false);



  async function submit(values) {
    try {
      setLoading(true);
      const { data } = await api.post("/Auth", values, {
        withCredentials: true,
      });
      localStorage.setItem("token", data.token);
      setUserToken(data.token);

      const searchParams = new URLSearchParams(location.search);
      const redirectParam = searchParams.get('redirect');
      const redirectPath = redirectParam || location.state?.from || "/home";
      navigate(redirectPath);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Login Error:", error);
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
            height: "100%",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
          },
          iconTheme: {
            primary: "#FF4D4F",
            secondary: "#ffffff",
          },
        },
      );
    }
  }

  let validationLogin = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .min(5, "Email must be at least 5 characters long")
      .required(""),

    password: yup
      .string()

      .min(4, "Password must be at least 4 characters long")
      .required(""),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: validationLogin,
    onSubmit: submit,
  });



  return (
    <>
      <div className={`${style.loginPage}`}>
        {/* <!-- HERO SECTION --> */}
        <div className={`${style.heroSection}`}>


          {/* <!-- Main Content Container --> */}
          <div className={`${style.heroContent}`}>

            {/* <!-- Right Column: Login Form --> */}
            <div className={`${style.formColumn}`}>
              <div className={`${style.loginCard}`}>
                {/* <!-- Form Header --> */}
                <div className={`${style.cardHeader}`}>
                  <div className={`${style.logoSection}`}>
                    <div className={`${style.logoImageContainer}`}>
                      <img src={logo} alt="Wed Logo" className={`${style.logoImage}`} onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }} />

                    </div>
                    <span className={`${style.logoLetters}`}>W E D</span>
                  </div>
                  <h2 className={`${style.welcomeTitle}`}>Welcome back</h2>
                  <p className={`${style.welcomeSubtitle}`}>
                    Sign in to your Wed account
                  </p>
                </div>

                {/* <!-- Inputs Container --> */}
                <form
                  onSubmit={formik.handleSubmit}
                  className={`${style.formFields}`}
                >
                  {/* <!-- Email Input --> */}
                  <div className={`${style.inputGroup}`}>
                    <label className={`${style.inputLabel}`}>Email</label>
                    <div className={`${style.inputWrapper}`}>
                      <div className={`${style.inputBorder}`}></div>
                      <div className={`${style.inputInner}`}>
                        <svg
                          className={`${style.inputIcon}`}
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <path
                            d="M16.5 5.25L9.75675 9.54525C9.52792 9.67816 9.268 9.74817 9.00338 9.74817C8.73875 9.74817 8.47883 9.67816 8.25 9.54525L1.5 5.25"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M15 3H3C2.17157 3 1.5 3.67157 1.5 4.5V13.5C1.5 14.3284 2.17157 15 3 15H15C15.8284 15 16.5 14.3284 16.5 13.5V4.5C16.5 3.67157 15.8284 3 15 3Z"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          />
                        </svg>
                        <input
                          type="email"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`${style.textInput}`}
                          placeholder="Enter your Email"
                        />
                      </div>
                    </div>
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-danger small mt-1">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>

                  {/* <!-- Password Input --> */}
                  <div className={`${style.inputGroup}`}>
                    <label className={`${style.inputLabel}`}>Password</label>
                    <div className={`${style.inputWrapper}`}>
                      <div className={`${style.inputBorder}`}></div>
                      <div className={`${style.inputInner}`}>
                        <svg
                          className={`${style.inputIcon}`}
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <path
                            d="M14.25 8.25H3.75C2.92157 8.25 2.25 8.92157 2.25 9.75V15C2.25 15.8284 2.92157 16.5 3.75 16.5H14.25C15.0784 16.5 15.75 15.8284 15.75 15V9.75C15.75 8.92157 15.0784 8.25 14.25 8.25Z"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M5.25 8.25V5.25C5.25 4.25544 5.64509 3.30161 6.34835 2.59835C7.05161 1.89509 8.00544 1.5 9 1.5C9.99456 1.5 10.9484 1.89509 11.6517 2.59835C12.3549 3.30161 12.75 4.25544 12.75 5.25V8.25"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          />
                        </svg>
                        <input
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type={showPassword ? "text" : "password"}
                          className={`${style.textInput}`}
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          className={`${style.passwordToggle}`}
                          onClick={() => setShowPassword(!showPassword)}
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
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <div className="text-danger small mt-1">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>

                  {/* <!-- Remember Me / Forgot Password --> */}
                  <div className={`${style.formActions}`}>
                    <label className={`${style.rememberMe}`}>
                      <input
                        type="checkbox"
                        name="rememberMe"
                        className={`${style.checkbox}`}
                        checked={formik.values.rememberMe}
                        onChange={formik.handleChange}
                      />
                      <span className={`${style.rememberText}`}>
                        Remember Me
                      </span>
                    </label>
                    {/* <a href="#" className={`${style.forgotPassword}`}>
                      Forgotten Password?
                    </a> */}
                  </div>

                  {/* <!-- Submit Button --> */}
                  <button
                    type="submit"
                    className={`${style.loginBtn}`}
                    disabled={!(formik.isValid && formik.dirty) || loading}
                  >
                    {loading ? (
                      <span
                        className="spinner-border spinner-border-sm text-light"
                        role="status"
                      />
                    ) : (
                      "login"
                    )}
                  </button>



                  {/* <!-- Sign Up Footer --> */}
                  <p className={`${style.signupText}`}>
                    <span>Don’t have an account? </span>
                    <a href="/register" className={`${style.signupLink}`}>
                      Sign Up
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
