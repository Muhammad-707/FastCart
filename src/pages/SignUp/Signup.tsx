import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

export default function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: ""
    },
    validationSchema: Yup.object({
      userName: Yup.string().required(`${t("text20")}`),
      email: Yup.string().email(`${t("text22")}`).required(`${t("text21")}`),
      password: Yup.string().min(6, `${t("text23a")}`).required(`${t("text23")}`),
      confirmPassword: Yup.string()
        .required(`${t("text24")}`)
        .oneOf([Yup.ref('password')], `${t("text24a")}`),
      phoneNumber: Yup.string().required(`${t("text24b")}`)
    }),
    onSubmit: async (values) => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://fastcard-1-o23z.onrender.com/api';

        const requestBody = {
          userName: values.userName.trim(),
          email: values.email.trim(),
          password: values.password,
          confirmPassword: values.confirmPassword,
          phoneNumber: values.phoneNumber.trim()
        };

        const response = await fetch(`${baseUrl}/Account/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });

        const textResult = await response.text();
        let errorMessage = "Registration failed. Please check your details.";

        if (response.ok || response.status === 201) {
          navigate("/Login");
        } else {
          try {
            const jsonError = JSON.parse(textResult);
            if (jsonError.message) errorMessage = jsonError.message;
          } catch {
            if (textResult) errorMessage = textResult;
          }
          setErrorModal({ isOpen: true, message: errorMessage });
        }
      } catch (error) {
        setErrorModal({
          isOpen: true,
          message: "Network error. Please check your internet connection."
        });
      }
    }
  });

  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center mt-[-10px] bg-white dark:bg-zinc-950 px-4 font-sans antialiased transition-colors duration-300 selection:bg-red-500/10 selection:text-[#DB4444]">
        <div className="w-full max-w-[400px] flex flex-col text-left my-10 bg-transparent transition-all">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
            {t("text9")}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 font-normal">
            {t("text10")}
          </p>
          <form className="flex flex-col w-full gap-5" onSubmit={formik.handleSubmit}>
            <div className="relative w-full">
              <input
                id="signup-username"
                type="text"
                name="userName"
                placeholder=" "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
                className={`peer w-full bg-white dark:bg-zinc-900/50 border ${formik.touched.userName && formik.errors.userName
                  ? 'border-red-500 dark:border-red-500 focus:ring-red-500/10'
                  : 'border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 focus:ring-zinc-900/5 dark:focus:ring-white/5'
                  } rounded-lg py-3.5 px-4 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-4 transition-all duration-200`}
              />
              <label htmlFor="signup-username" className="absolute left-3 bg-zinc-50 dark:bg-zinc-950 peer-focus:bg-zinc-50 dark:peer-focus:bg-zinc-950 px-1.5 transition-all duration-200 pointer-events-none -top-2 text-xs text-zinc-400 dark:text-zinc-500 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 dark:peer-placeholder-shown:text-zinc-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-zinc-500 dark:peer-focus:text-zinc-400">
                {t("text11")}
              </label>
              {formik.touched.userName && formik.errors.userName && (
                <p className="text-red-500 dark:text-red-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                  <span>{formik.errors.userName}</span>
                </p>
              )}
            </div>
            <div className="relative w-full">
              <input
                id="signup-email"
                type="text"
                name="email"
                placeholder=" "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`peer w-full bg-white dark:bg-zinc-900/50 border ${formik.touched.email && formik.errors.email
                  ? 'border-red-500 dark:border-red-500 focus:ring-red-500/10'
                  : 'border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 focus:ring-zinc-900/5 dark:focus:ring-white/5'
                  } rounded-lg py-3.5 px-4 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-4 transition-all duration-200`}
              />
              <label htmlFor="signup-email" className="absolute left-3 bg-zinc-50 dark:bg-zinc-950 peer-focus:bg-zinc-50 dark:peer-focus:bg-zinc-950 px-1.5 transition-all duration-200 pointer-events-none -top-2 text-xs text-zinc-400 dark:text-zinc-500 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 dark:peer-placeholder-shown:text-zinc-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-zinc-500 dark:peer-focus:text-zinc-400">
                {t("text12")}
              </label>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 dark:text-red-400 text-xs mt-1.5 font-medium">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <div className="relative w-full">
              <input
                id="signup-phone"
                type="text"
                name="phoneNumber"
                placeholder=" "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
                className={`peer w-full bg-white dark:bg-zinc-900/50 border ${formik.touched.phoneNumber && formik.errors.phoneNumber
                  ? 'border-red-500 dark:border-red-500 focus:ring-red-500/10'
                  : 'border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 focus:ring-zinc-900/5 dark:focus:ring-white/5'
                  } rounded-lg py-3.5 px-4 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-4 transition-all duration-200`}
              />
              <label htmlFor="signup-phone" className="absolute left-3 bg-zinc-50 dark:bg-zinc-950 peer-focus:bg-zinc-50 dark:peer-focus:bg-zinc-950 px-1.5 transition-all duration-200 pointer-events-none -top-2 text-xs text-zinc-400 dark:text-zinc-500 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 dark:peer-placeholder-shown:text-zinc-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-zinc-500 dark:peer-focus:text-zinc-400">
                {t("text13")}
              </label>
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="text-red-500 dark:text-red-400 text-xs mt-1.5 font-medium">
                  {formik.errors.phoneNumber}
                </p>
              )}
            </div>
            <div className="relative w-full">
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder=" "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`peer w-full bg-white dark:bg-zinc-900/50 border ${formik.touched.password && formik.errors.password
                  ? 'border-red-500 dark:border-red-500 focus:ring-red-500/10'
                  : 'border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 focus:ring-zinc-900/5 dark:focus:ring-white/5'
                  } rounded-lg py-3.5 pl-4 pr-12 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-4 transition-all duration-200`}
              />
              <label htmlFor="signup-password" className="absolute left-3 bg-zinc-50 dark:bg-zinc-950 peer-focus:bg-zinc-50 dark:peer-focus:bg-zinc-950 px-1.5 transition-all duration-200 pointer-events-none -top-2 text-xs text-zinc-400 dark:text-zinc-500 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 dark:peer-placeholder-shown:text-zinc-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-zinc-500 dark:peer-focus:text-zinc-400">
                {t("text14")}
              </label>
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {showPassword ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>}
                </svg>
              </button>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 dark:text-red-400 text-xs mt-1.5 font-medium">
                  {formik.errors.password}
                </p>
              )}
            </div>
            <div className="relative w-full">
              <input
                id="signup-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder=" "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className={`peer w-full bg-white dark:bg-zinc-900/50 border ${formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? 'border-red-500 dark:border-red-500 focus:ring-red-500/10'
                  : 'border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 focus:ring-zinc-900/5 dark:focus:ring-white/5'
                  } rounded-lg py-3.5 pl-4 pr-12 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-4 transition-all duration-200`}
              />
              <label htmlFor="signup-confirm-password" className="absolute left-3 bg-zinc-50 dark:bg-zinc-950 peer-focus:bg-zinc-50 dark:peer-focus:bg-zinc-950 px-1.5 transition-all duration-200 pointer-events-none -top-2 text-xs text-zinc-400 dark:text-zinc-500 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 dark:peer-placeholder-shown:text-zinc-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-zinc-500 dark:peer-focus:text-zinc-400">
                {t("text15")}
              </label>
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {showConfirmPassword ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>}
                </svg>
              </button>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="text-red-500 dark:text-red-400 text-xs mt-1.5 font-medium">
                  {formik.errors.confirmPassword}
                </p>
              )}
            </div>
            <button type="submit" className="w-full bg-[#DB4444] hover:bg-[#c23b3b] dark:bg-red-600 dark:hover:bg-red-700 text-white font-medium py-3.5 rounded-lg text-sm shadow-sm hover:shadow-md hover:shadow-red-500/10 active:scale-[0.98] transition-all duration-200 mt-2">
              {t("text16")}
            </button>
            <button
              type="button"
              onClick={() => console.log("Google Sign Up clicked")}
              className="w-full flex items-center justify-center gap-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 text-zinc-700 dark:text-zinc-200 font-medium py-3.5 rounded-lg text-sm active:scale-[0.98] transition-all duration-200 shadow-sm focus:outline-none focus:ring-4 focus:ring-zinc-900/5 dark:focus:ring-white/5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>{t("text17")}</span>
            </button>
          </form>
          <div className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
            {t("text18")}{" "}
            <Link to="/Login" className="text-zinc-900 dark:text-zinc-50 font-medium underline underline-offset-4 hover:text-[#DB4444] dark:hover:text-red-400 transition-colors ml-1">
              {t("text19")}
            </Link>
          </div>
        </div>
      </div>
      {errorModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/40 backdrop-blur-md px-4">
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 w-full max-w-[340px] flex flex-col items-center text-center shadow-xl border border-zinc-100 dark:border-zinc-800 transition-all duration-300 transform scale-100">
            <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-950/40 flex items-center justify-center mb-3.5">
              <svg className="w-5 h-5 text-[#DB4444] dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-1.5">{t("text19a")}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5 leading-normal px-2">{errorModal.message}</p>
            <button onClick={() => setErrorModal({ isOpen: false, message: "" })} className="w-full bg-[#DB4444] hover:bg-[#c23b3b] dark:bg-red-600 dark:hover:bg-red-700 text-white font-medium py-2.5 rounded-lg text-sm shadow-sm transition-colors duration-200">
              {t("text19b")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}