import { Form, Link, redirect } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { FormInput, SubmitButton } from "../components";
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/local/register", data);
    toast.success("Account created successfully");
    return redirect("/login");
  } catch (error) {
    toast.error(
      error.response?.data?.error?.message ||
        "Please check your credentials and try again"
    );
    return null;
  }
};
const Register = () => {
  return (
    <section className="h-screen grid place-items-center ">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center font-bold text-3xl">Register</h4>
        <FormInput
          label="Username"
          name="username"
          type="text"
          defaultValue="tost"
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          defaultValue="tost@test.com"
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          defaultValue="tost12"
        />
        <div className="mt-4">
          <SubmitButton text="Register" />
        </div>
        <p className="text-center">
          Already a member?
          <Link
            className="ml-2 link link-hover link-primary capitalize"
            to="/login"
          >
            Login
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Register;
