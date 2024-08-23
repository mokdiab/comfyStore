import { Filters, ProductsContainer, PaginationContainer } from "../components";
import { customFetch } from "../utils/index";
const productsQuery = (params) => {
  const { search, company, category, shipping, order, price, page } = params;
  return {
    queryKey: [
      "products",
      search ?? "",
      company ?? "all",
      category ?? "all",
      shipping ?? false,
      order ?? "a-z",
      price ?? 10000,
      page ?? 1,
    ],
    queryFn: () => customFetch("/products", { params }),
  };
};
export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const response = await queryClient.ensureQueryData(productsQuery(params));

    const products = response.data.data;
    const meta = response.data.meta;

    return { products, meta, params };
  };
const Products = () => {
  return (
    <section>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </section>
  );
};

export default Products;
