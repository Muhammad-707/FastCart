import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  // Состояние для красивой модалки ошибки
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch('https://fastcard-1-o23z.onrender.com/api/Account/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            // Если бэкенд просит email, отправляем email. Если userName - отправляем userName.
            // Я добавил оба, чтобы точно сработало, либо бэкенд возьмет то, что ему нужно.
            email: values.email, 
            userName: values.email, 
            password: values.password
          })
        });
        
        const result = await response.json().catch(() => ({})); 
        
        if (response.ok) {
          navigate("/"); 
        } else {
          // Вызываем модалку вместо уродливого alert
          setErrorModal({ 
            isOpen: true, 
            message: result.message || "Invalid email or password. Please try again." 
          });
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
      <div className="min-h-screen w-full flex items-center justify-center bg-white px-4 font-sans mt-[-60px]">
        <div className="w-full max-w-[400px] flex flex-col text-left">
          
          <h1 className="text-3xl font-medium tracking-tight text-black mb-2">
            Log in to Exclusive
          </h1>
          <p className="text-sm text-black mb-10">
            Enter your details below
          </p>

          <form className="flex flex-col w-full" onSubmit={formik.handleSubmit}>
            
            <div className="flex flex-col gap-8 mb-6">
              
              {/* Поле Email */}
              <div className="relative w-full">
                <input
                  id="login-email"
                  type="text"
                  name="email"
                  placeholder=" "
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className={`peer w-full bg-transparent border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-zinc-300'} rounded-[4px] py-3.5 px-4 text-sm text-black focus:outline-none focus:border-zinc-500 transition-colors relative z-0`}
                />
                <label
                  htmlFor="login-email"
                  className={`absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none z-10
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
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder=" "
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={`peer w-full bg-transparent border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-zinc-300'} rounded-[4px] py-3.5 pl-4 pr-12 text-sm text-black focus:outline-none focus:border-zinc-500 transition-colors relative z-0`}
                />
                <label
                  htmlFor="login-password"
                  className={`absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none z-10
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-black transition-colors z-10"
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

            </div>

            <div className="text-center mb-8">
              <Link to="/forget-password" className="text-[#DB4444] text-sm font-normal hover:underline transition-all">
                Forget Password?
              </Link>
            </div>

            <button type="submit" className="w-full bg-[#DB4444] hover:bg-[#c23b3b] text-white font-medium py-4 rounded-[4px] text-sm transition-colors">
              Log In
            </button>

          </form>

          <div className="mt-6 text-center text-sm text-zinc-500">
            Don't have an account?{" "}
            <Link to="/SignUp" className="text-black font-medium underline underline-offset-4 hover:text-zinc-700 transition-colors ml-1">
              Sign up
            </Link>
          </div>

        </div>
      </div>

      {/* Красивая модалка ошибки (показывается только если errorModal.isOpen === true) */}
      {errorModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 transition-all">
          <div className="bg-white rounded-lg p-6 w-full max-w-[320px] flex flex-col items-center text-center shadow-2xl transform scale-100">
            
            {/* Иконка крестика в кружке */}
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4 border border-red-100">
              <svg className="w-7 h-7 text-[#DB4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            
            <h3 className="text-lg font-medium text-black mb-2">Login Failed</h3>
            <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
              {errorModal.message}
            </p>
            
            <button
              onClick={() => setErrorModal({ isOpen: false, message: "" })}
              className="w-full bg-[#DB4444] hover:bg-[#c23b3b] text-white font-medium py-3 rounded-[4px] text-sm transition-colors"
            >
              Try Again
            </button>
            
          </div>
        </div>
      )}
    </>
  );
}