import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "@/reducers/AuthSlice";
import { RootState } from "@/store/store";

export default function Account() {
  const { t } = useTranslation();
  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });

  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      phoneNumber: "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
      newPassword: Yup.string().min(6, "Password must be at least 6 characters"),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], "Passwords must match")
        .when('newPassword', {
          is: (val: string) => val && val.length > 0,
          then: (schema) => schema.required("Confirm your new password"),
        }),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log("Submitting updated data:", values);
        const currentUserData = JSON.parse(localStorage.getItem("userData") || "{}");
        const updatedData = {
          ...currentUserData,
          userName: values.userName,
          email: values.email,
          phoneNumber: values.phoneNumber
        };
        localStorage.setItem("userData", JSON.stringify(updatedData));

        dispatch(setCredentials({
          user: updatedData,
          token: token || "" 
        }));

        setNotification({ show: true, message: "Profile updated successfully!", type: "success" });

        resetForm({
          values: {
            ...values,
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: ""
          }
        });

        setTimeout(() => setNotification({ show: false, message: "", type: "success" }), 3000);
      } catch (error) {
        setNotification({ show: true, message: "Failed to update profile.", type: "error" });
        setTimeout(() => setNotification({ show: false, message: "", type: "error" }), 3000);
      }
    }
  });

  useEffect(() => {
    if (user) {
      formik.setValues({
        ...formik.values,
        userName: user.userName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
      });
    }
  }, [user]);

  return (
    <div className="w-full min-h-screen py-8 dark:bg-zinc-950 transition-colors pb-20 duration-300 font-sans">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6">

        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8 md:mb-12">
          <Link to="/" className="hover:text-[#DB4444] transition-colors">
            {t("text1")}
          </Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-medium">{t("text48")}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <aside className="w-full lg:w-[250px] flex flex-col gap-8 shrink-0">
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4 text-base">{t("text147")}</h4>
              <div className="flex flex-col gap-3 pl-0 sm:pl-4 text-sm text-zinc-500 dark:text-zinc-400">
                <span className="text-[#DB4444] font-medium cursor-pointer transition-colors">{t("text148")}</span>
                <span className="cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">{t("text149")}</span>
                <span className="cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">{t("text150")}</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4 text-base">{t("text151")}</h4>
              <div className="flex flex-col gap-3 pl-0 sm:pl-4 text-sm text-zinc-500 dark:text-zinc-400">
                <span className="cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">{t("text152")}</span>
                <span className="cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">{t("text153")}</span>
              </div>
            </div>
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 cursor-pointer hover:text-[#DB4444] transition-colors text-base">
              {t("text154")}
            </h4>
          </aside>

          <main className="lg:w-[1000px] bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 md:p-10 transition-all duration-300 relative overflow-hidden">
            {notification.show && (
              <div className={`absolute top-0 left-0 w-full p-4 text-center text-sm font-medium text-white transition-all duration-300 ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                {notification.message}
              </div>
            )}

            <h2 className="text-xl md:text-2xl font-bold text-[#DB4444] mb-8 mt-2">{t("text155")}</h2>
            <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 flex flex-col gap-2 relative">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t("text156")}</label>
                  <input
                    type="text"
                    name="userName"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full bg-zinc-50 dark:bg-zinc-950 border ${formik.touched.userName && formik.errors.userName ? 'border-red-500 focus:ring-red-500/20' : 'border-zinc-200 dark:border-zinc-800 focus:border-[#DB4444] focus:ring-[#DB4444]/20'} p-3.5 rounded-lg outline-none text-sm text-zinc-900 dark:text-zinc-100 transition-all focus:ring-4`}
                  />
                  {formik.touched.userName && formik.errors.userName && (
                    <span className="text-xs text-red-500 absolute -bottom-5 left-0">{formik.errors.userName}</span>
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-2 relative">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t("text157")}</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full bg-zinc-50 dark:bg-zinc-950 border ${formik.touched.phoneNumber && formik.errors.phoneNumber ? 'border-red-500 focus:ring-red-500/20' : 'border-zinc-200 dark:border-zinc-800 focus:border-[#DB4444] focus:ring-[#DB4444]/20'} p-3.5 rounded-lg outline-none text-sm text-zinc-900 dark:text-zinc-100 transition-all focus:ring-4`}
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <span className="text-xs text-red-500 absolute -bottom-5 left-0">{formik.errors.phoneNumber}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 mt-2">
                <div className="flex-1 flex flex-col gap-2 relative">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t("text158")}</label>
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full bg-zinc-50 dark:bg-zinc-950 border ${formik.touched.email && formik.errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-zinc-200 dark:border-zinc-800 focus:border-[#DB4444] focus:ring-[#DB4444]/20'} p-3.5 rounded-lg outline-none text-sm text-zinc-900 dark:text-zinc-100 transition-all focus:ring-4`}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <span className="text-xs text-red-500 absolute -bottom-5 left-0">{formik.errors.email}</span>
                  )}
                </div>
              </div>

              <div className="h-px w-full bg-zinc-100 dark:bg-zinc-800 my-4"></div>

              <div className="flex flex-col gap-5">
                <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{t("text160")}</h4>

                <div className="relative">
                  <input
                    type="password"
                    name="currentPassword"
                    placeholder={t("text161")}
                    value={formik.values.currentPassword}
                    onChange={formik.handleChange}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-lg outline-none text-sm text-zinc-900 dark:text-zinc-100 transition-all focus:border-[#DB4444] focus:ring-4 focus:ring-[#DB4444]/20 placeholder-zinc-400 dark:placeholder-zinc-600"
                  />
                </div>

                <div className="relative">
                  <input
                    type="password"
                    name="newPassword"
                    placeholder={t("text162")}
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full bg-zinc-50 dark:bg-zinc-950 border ${formik.touched.newPassword && formik.errors.newPassword ? 'border-red-500 focus:ring-red-500/20' : 'border-zinc-200 dark:border-zinc-800 focus:border-[#DB4444] focus:ring-[#DB4444]/20'} p-3.5 rounded-lg outline-none text-sm text-zinc-900 dark:text-zinc-100 transition-all focus:ring-4 placeholder-zinc-400 dark:placeholder-zinc-600`}
                  />
                  {formik.touched.newPassword && formik.errors.newPassword && (
                    <span className="text-xs text-red-500 absolute -bottom-5 left-0">{formik.errors.newPassword}</span>
                  )}
                </div>

                <div className="relative mt-1">
                  <input
                    type="password"
                    name="confirmNewPassword"
                    placeholder={t("text163")}
                    value={formik.values.confirmNewPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full bg-zinc-50 dark:bg-zinc-950 border ${formik.touched.confirmNewPassword && formik.errors.confirmNewPassword ? 'border-red-500 focus:ring-red-500/20' : 'border-zinc-200 dark:border-zinc-800 focus:border-[#DB4444] focus:ring-[#DB4444]/20'} p-3.5 rounded-lg outline-none text-sm text-zinc-900 dark:text-zinc-100 transition-all focus:ring-4 placeholder-zinc-400 dark:placeholder-zinc-600`}
                  />
                  {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword && (
                    <span className="text-xs text-red-500 absolute -bottom-5 left-0">{formik.errors.confirmNewPassword}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 sm:gap-6 items-center mt-6">
                <button
                  type="button"
                  onClick={() => formik.resetForm()}
                  className="w-full sm:w-auto text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  {t("text164")}
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#DB4444] text-white px-8 py-3.5 rounded-lg text-sm font-medium hover:bg-[#c23b3b] hover:shadow-lg hover:shadow-red-500/20 active:scale-[0.98] transition-all duration-200"
                >
                  {t("text165")}
                </button>
              </div>
            </form>

          </main>
        </div>
      </div>
    </div>
  );
}