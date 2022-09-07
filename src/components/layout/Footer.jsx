import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer px-3 py-2 bg-dark bg-opacity-10">
      <div className="container">
        <div className="col">
          <div className="my-3 mb-4 d-flex flex-column text-left justify-content-around">
          <Link
              to="/fees"
              className="text-decoration-none fw-semibold"
            >
              Fees
            </Link>
            <Link
              to="/courses"
              className="text-decoration-none fw-semibold"
            >
              Courses
            </Link>
            <Link
              to="/syllabus"
              className="text-decoration-none fw-semibold"
              >
              Syllabus
              </Link>

          </div>
          <div className="col-md-6 flex justify-content-between align-items-center m-auto">
            <p className="text-center text-muted">VD &copy; 2022</p>
          </div>
          <div className="col-md-6 m-auto">
            <p className="text-center ">
              <a href="#header" className="text-black text-opacity-75">
                Back to top
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
