import commbg from "../components/img/commbg.jpg";

const Home = () => (
  <div>
    <div className="d-flex justify-content-between w-75 mx-auto my-4">
      <div className="align-self-center px-8 w-60">
        <h1 style={{ fontWeight: 600, color: "#074256" }}>
          Welcome to Christcomm
        </h1>
        <h4 className="">A free and easy place for students in need of help</h4>
      </div>
      <img
        src={commbg}
        alt="commbg"
        style={{ borderRadius: 8, maxWidth: "22em" }}
      />
    </div>
    <div
      className="w-100 my-6"
      style={{ marginTop: "8rem", marginBottom: "2rem" }}
    >
      <div className="fw-semibold mt-3 bg-light bg-opacity-50 rounded p-3 mx-4 mt- w-75 mx-auto">
        <p className="fs-5 text-opacity-75 text- fw-bold">
          ChristComm is a web application designed for students in need of
          resources or assistance from fellow students. This web application
          allows students to post resource links and request them as well. This
          web application is a free and easy place for students in need of help.
        </p>
      </div>
    </div>
  </div>
);

export default Home;
