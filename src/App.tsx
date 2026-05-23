import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/layout";
import { Suspense } from "react";
import Loading from "@/components/shared/Loading"; 
import { WishlistProvider } from "@/pages/Wishlist/WishlistContext";
import { ErrorBoundary } from "@/components/shared/ErrorBoundery";
import { NotFound } from "@/components/shared/NotFound"; 
import { 
  Home, Contact, About, Signup, Login, 
  Account, Product, Cart, Wishlist, Detail, Checkout 
} from "./router/router";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Suspense fallback={<Loading />}><Home /></Suspense> },
        { path: "contact", element: <Suspense fallback={<Loading />}><Contact /></Suspense> },
        { path: "about", element: <Suspense fallback={<Loading />}><About /></Suspense> },
        { path: "signUp", element: <Suspense fallback={<Loading />}><Signup /></Suspense> },
        { path: "login", element: <Suspense fallback={<Loading />}><Login /></Suspense> },
        { path: "account", element: <Suspense fallback={<Loading />}><Account /></Suspense> },
        { path: "product", element: <Suspense fallback={<Loading />}><Product /></Suspense> },
        { path: "cart", element: <Suspense fallback={<Loading />}><Cart /></Suspense> },
        { path: "wishlist", element: <Suspense fallback={<Loading />}><Wishlist /></Suspense> },
        { path: "detail/:id", element: <Suspense fallback={<Loading />}><Detail /></Suspense> },
        { path: "checkout", element: <Suspense fallback={<Loading />}><Checkout /></Suspense> },
        // Обработка несуществующих страниц
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    // ErrorBoundary оборачивает всё приложение, чтобы перехватывать ошибки рендеринга
    <ErrorBoundary>
      <WishlistProvider>
        <RouterProvider router={router} />
      </WishlistProvider>
    </ErrorBoundary>
  );
}