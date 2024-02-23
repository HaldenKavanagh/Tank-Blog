import { Link, useLocation } from "react-router-dom";

function NavTabs() {
  const location = useLocation();

  const getPageName = (pathname) => {
    // Extract the last part of the pathname as the page name
    const pageName = pathname.substring(1);
    return pageName === "" ? "Home" : pageName;
  };

  return (
    <div className="navbar">
      <Link
        to="/home"
        className={
          getPageName(location.pathname) === "Home"
            ? "nav-link active"
            : "nav-link"
        }
      >
        <p>Home</p>
      </Link>
    </div>
  );
}

export default NavTabs;
