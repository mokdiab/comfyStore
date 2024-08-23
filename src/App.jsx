import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  About,
  Cart,
  Checkout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Orders,
  Products,
  Register,
  SingleProduct,
} from "./pages";
import { ErrorElement } from "./components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { loader as landingLoader } from "./pages/Landing";
import { loader as singleProductLoader } from "./pages/SingleProduct";
import { loader as productsLoader } from "./pages/Products";
import { loader as checkoutLoader } from "./pages/Checkout";
import { loader as ordersLoader } from "./pages/Orders";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as CheckoutAction } from "./components/checkout/CheckoutForm";
import store from "./store";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 6 * 60 * 1000, // 1 minute
    },
  },
});
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />,
          errorElement: <ErrorElement />,
          loader: landingLoader(queryClient),
        },
        { path: "about", element: <About /> },
        {
          path: "products",
          element: <Products />,
          errorElement: <ErrorElement />,
          loader: productsLoader(queryClient),
        },
        {
          path: "products/:id",
          element: <SingleProduct />,
          errorElement: <ErrorElement />,
          loader: singleProductLoader(queryClient),
        },

        { path: "cart", element: <Cart /> },
        {
          path: "checkout",
          element: <Checkout />,
          loader: checkoutLoader(store),
          action: CheckoutAction(store, queryClient),
        },
        {
          path: "orders",
          element: <Orders />,
          loader: ordersLoader(store, queryClient),
        },
      ],
    },
    { path: "login", element: <Login />, action: loginAction(store) },
    { path: "register", element: <Register />, action: registerAction },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
