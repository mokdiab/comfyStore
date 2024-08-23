import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { FormInput, SubmitButton } from "../components";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const response = await customFetch.post("/auth/local", data);
      toast.success("Logged in successfully");
      store.dispatch(loginUser(response.data));
      return redirect("/");
    } catch (error) {
      toast.error(
        error.response?.data?.error?.message ||
          "Please check your credentials and try again"
      );
      return null;
    }
  };
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginGuestUser = async () => {
    try {
      const response = await customFetch.post("/auth/local", {
        identifier: "test@test.com",
        password: "secret",
      });
      toast.success("Logged in successfully");
      dispatch(loginUser(response.data));
      return navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.error?.message ||
          "An error occurred while logging in"
      );
      return null;
    }
  };
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center font-bold text-3xl">Login</h4>
        <FormInput label="Email" name="identifier" type="email" />
        <FormInput label="Password" name="password" type="password" />
        <div className="mt-4">
          <SubmitButton text="Login" />
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={loginGuestUser}
        >
          Guest user
        </button>
        <p className="text-center">
          Not a member yet?
          <Link
            className="ml-2 link link-hover link-primary capitalize"
            to="/register"
          >
            Register
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
