import { lazy } from "react";

export const Home = lazy(() => import("@/pages/Home/Home"));
export const Contact = lazy(() => import("@/pages/Contact/Contact"));
export const About = lazy(() => import("@/pages/About/About"));
export const Signup = lazy(() => import("@/pages/SignUp/Signup"));
export const Login = lazy(() => import("@/pages/SignUp/Login"));
export const Account = lazy(() => import("@/pages/Home/Account"));
export const Product = lazy(() => import("@/pages/Product/Product"));
export const Cart = lazy(() => import("@/pages/Cart/Cart"));
export const Wishlist = lazy(() => import("@/pages/Wishlist/Wishlist"));
export const Detail = lazy(() => import("@/pages/Detail/Detail"));
export const Checkout = lazy(() => import("@/pages/Checkout/Checkout"));

