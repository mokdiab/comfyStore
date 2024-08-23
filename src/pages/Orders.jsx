import { redirect, useLoaderData } from "react-router-dom";
import { customFetch } from "../utils";
import {
  SectionTitle,
  OrdersList,
  ComplexPaginationContainer,
} from "../components";
import { toast } from "react-toastify";
const ordersQuery = (params, user) => ({
  queryKey: ["orders", user.userName, params.page ? parseInt(params.page) : 1],
  queryFn: () =>
    customFetch.get("/orders", {
      params,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }),
});
export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    if (!user) {
      toast.warn("You must be logged in to view your orders");
      return redirect("/login");
    }
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    try {
      const response = await queryClient.ensureQueryData(
        ordersQuery(params, user)
      );
      return { orders: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "there was an error accessing your orders";
      toast.error(errorMessage);
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return redirect("/login");
      }
      return null;
    }
  };
const Orders = () => {
  const { meta } = useLoaderData();
  if (meta.pagination.total < 1) {
    return <SectionTitle text="Please make an order" />;
  }
  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  );
};
export default Orders;
