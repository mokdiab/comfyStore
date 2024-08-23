import { Link, useRouteError } from "react-router-dom";
const Error = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <main className=" min-h-[100vh] grid place-items-center px-8">
        <div className="text-center">
          <h1 className="text-primary text-9xl font-semibold ">404</h1>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mt-4">
            Page Not Found
          </h2>
          <p className="mt-6 text-lg leading-7">
            The page you are looking for does not exist
          </p>
          <div className="mt-10">
            <Link className="btn btn-secondary " to="/">
              Go back home
            </Link>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className=" min-h-[100vh] grid place-items-center px-8">
      <div className="p-8 text-center shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Oops! Something went wrong.
        </h1>
        <p className="text-xl mb-4">
          We&apos;re sorry, but an unexpected error occurred.
        </p>
        <div className="">
          <Link className="btn btn-secondary " to="/">
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Error;
