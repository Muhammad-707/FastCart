import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Passwords must match").required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      // Пример того, как должна работать реальная регистрация, чтобы бэкенд запомнил пользователя:
      /*
      try {
        const response = await fetch('https://fastcard-1-o23z.onrender.com/api/Account/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password
          })
        });
        if (response.ok) {
          navigate("/Login");
        } else {
          console.error("Ошибка при регистрации");
        }
      } catch (error) {
        console.error(error);
      }
      */
      
      // Пока бэкенда регистрации нет, просто переходим на логин:
      console.log("Переходим в Login", values);
      navigate("/Login");
    }
  });

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-4 font-sans mt-[-50px]">
      <div className="w-full max-w-[400px] flex flex-col text-left">
        
        <h1 className="text-3xl font-medium tracking-tight text-black mb-2">
          Create an account
        </h1>
        <p className="text-sm text-black mb-10">
          Enter your details below
        </p>

        <form className="flex flex-col w-full" onSubmit={formik.handleSubmit}>
          
          <div className="flex flex-col gap-7 mb-10">
            {/* Поле Name */}
            <div className="relative w-full">
              <input
                id="signup-name"
                type="text"
                name="name"
                placeholder=" "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className={`peer w-full bg-transparent border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-zinc-300'} rounded-[4px] py-3.5 px-4 text-sm text-black focus:outline-none focus:border-zinc-500 transition-colors`}
              />
              <label
                htmlFor="signup-name"
                className={`absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none
                  -top-2.5 text-xs text-zinc-500
                  peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm
                  peer-focus:-top-2.5 peer-focus:text-xs
                  ${formik.touched.name && formik.errors.name ? '!text-red-500' : ''}
                `}
              >
                Name
              </label>
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-xs mt-1 absolute -bottom-5 left-0">{formik.errors.name}</p>
              )}
            </div>

            {/* Поле Email */}
            <div className="relative w-full">
              <input
                id="signup-email"
                type="text"
                name="email"
                placeholder=" "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`peer w-full bg-transparent border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-zinc-300'} rounded-[4px] py-3.5 px-4 text-sm text-black focus:outline-none focus:border-zinc-500 transition-colors`}
              />
              <label
                htmlFor="signup-email"
                className={`absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none
                  -top-2.5 text-xs text-zinc-500
                  peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm
                  peer-focus:-top-2.5 peer-focus:text-xs
                  ${formik.touched.email && formik.errors.email ? '!text-red-500' : ''}
                `}
              >
                Email or phone number
              </label>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs mt-1 absolute -bottom-5 left-0">{formik.errors.email}</p>
              )}
            </div>

            {/* Поле Password */}
            <div className="relative w-full">
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder=" "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`peer w-full bg-transparent border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-zinc-300'} rounded-[4px] py-3.5 pl-4 pr-12 text-sm text-black focus:outline-none focus:border-zinc-500 transition-colors`}
              />
              <label
                htmlFor="signup-password"
                className={`absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none
                  -top-2.5 text-xs text-zinc-500
                  peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm
                  peer-focus:-top-2.5 peer-focus:text-xs
                  ${formik.touched.password && formik.errors.password ? '!text-red-500' : ''}
                `}
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-black transition-colors"
                aria-label="Toggle password visibility"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {showPassword ? (
                    <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></>
                  ) : (
                    <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></>
                  )}
                </svg>
              </button>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs mt-1 absolute -bottom-5 left-0">{formik.errors.password}</p>
              )}
            </div>

            {/* Поле Confirm Password */}
            <div className="relative w-full">
              <input
                id="signup-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder=" "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className={`peer w-full bg-transparent border ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-zinc-300'} rounded-[4px] py-3.5 pl-4 pr-12 text-sm text-black focus:outline-none focus:border-zinc-500 transition-colors`}
              />
              <label
                htmlFor="signup-confirm-password"
                className={`absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none
                  -top-2.5 text-xs text-zinc-500
                  peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm
                  peer-focus:-top-2.5 peer-focus:text-xs
                  ${formik.touched.confirmPassword && formik.errors.confirmPassword ? '!text-red-500' : ''}
                `}
              >
                Confirm Password
              </label>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-black transition-colors"
                aria-label="Toggle confirm password visibility"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {showConfirmPassword ? (
                    <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></>
                  ) : (
                    <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></>
                  )}
                </svg>
              </button>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 absolute -bottom-5 left-0">{formik.errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <button type="submit" className="w-full bg-[#DB4444] hover:bg-[#c23b3b] text-white font-medium py-4 rounded-[4px] text-sm transition-colors">
              Create Account
            </button>
            <button type="button" className="w-full bg-white border border-zinc-300 hover:bg-zinc-50 text-black font-normal py-4 rounded-[4px] text-sm flex items-center justify-center gap-4 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-zinc-500">
          Already have account?{" "}
          <Link to="/Login" className="text-black font-medium underline underline-offset-4 hover:text-zinc-700 transition-colors ml-1">
            Log in
          </Link>
        </div>

      </div>
    </div>
  );
}