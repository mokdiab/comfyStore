import { useLocation, Link } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="breadcrumbs text-md capitalize">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((pathname, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? null : (
            <li key={routeTo}>
              <Link to={routeTo}>{pathname}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumb;
