import { Link } from "react-router-dom";
import Logo from "../img/logo.png";

const LoginHeader = () => {
  return (
    <div className="header d-flex justify-content-between p-1 px-3" id="header">
      <div className="vd-logo">
        <img src={Logo} alt="Logo" style={{width:64, marginTop:8, cursor:"pointer"}} onClick={
          () => {
            window.location.href = "/";
          }
        } />
      </div>
      <div className="header-right">
        <div className="nav-opt">
          <div className="nav-opt-item d-flex align-items-center">
            <Link
              to="/"
              className="nav-opt-item-link mx-3 text-decoration-none fs-4 fw-bold link-info-2"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;
