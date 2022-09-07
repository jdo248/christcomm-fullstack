import { Link } from "react-router-dom";
import Logo from "../img/logo.png";

const Header = () => {
  return (
    <div className="header d-flex justify-content-between p-2 px-3 bg-dark bg-opacity-10" id="header">
      <div className="vd-logo">
        <img src={Logo} alt="Logo" style={{width:64, cursor: "pointer"}} onClick={
          () => {
            window.location.href = "/";
          }
        } />
      </div>
      <div className="header-right">
        <div className="nav-opt">
          <div className="nav-opt-item d-flex align-items-center">
            { 
            window.localStorage.getItem("user") && window.localStorage.getItem("token") && (
            <button className="border-0 rounded-circle bg-opacity-20 mx-3" style={{background:"#074256"}} onClick={ (e) => {e.preventDefault(); window.location.href = "/newentry"} }>
               <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#074256" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="post"><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </button>
            ) 
}
            <Link
              to="/"
              className="nav-opt-item-link mx-3 text-decoration-none fs-4 fw-bold link-info"
              style={{color : "#074256 !important"}}
            >
              Home
            </Link>
            <Link
              to="/browse"
              className="nav-opt-item-link mx-3 text-decoration-none fs-4 fw-bold link-info"
              style={{color : "#074256 !important"}}
            >
              Browse
            </Link>
            <Link
              to="/courses"
              className="nav-opt-item-link mx-3 text-decoration-none fs-4 fw-bold link-info"
              style={{color : "#074256 !important"}}
            >
              Courses
            </Link>
            <Link
              to="/profile"
              className="nav-opt-item-link mx-3 text-decoration-none fs-4 fw-bold link-info"
              style={{color : "#074256 !important"}}
            >
              Profile
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
