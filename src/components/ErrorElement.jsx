import { useRouteError, Link } from "react-router-dom";
const ErrorElement = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <main className=" min-h-[100vh] grid place-items-center px-8">
      <div className="p-8 h-72 text-center place-content-center shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Oops! Something went wrong.
        </h1>
        <p className="text-xl mb-4">
          We&apos;re sorry, but an unexpected error occurred.
        </p>
        {/* <div className="">
          <Link className="btn btn-secondary " to="/">
            Go back home
          </Link>
        </div> */}
      </div>
    </main>
  );
};

export default ErrorElement;
