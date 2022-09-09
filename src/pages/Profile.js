import { useEffect, useState } from "react";
import { logout } from "../helpers/logout";

const Profile = () => {
  const [user, setUser] = useState(null);
  const getUserProfile = async () => {
    const userid = window.localStorage.getItem("user");
    const response = await fetch(`/api/profile/${JSON.parse(userid).user_id}`);
    const data = await response.json();
    setUser(data);
  };
  useEffect(() => {
    getUserProfile();
    document.title = `Your Profile`;
  }, []);

  const getSaved = async () => {
    window.location.href = `/saved`;
  };
  return (
    <div className="py-3">
      <h1 className="text-center">Your Profile</h1>
      <div className="card mx-auto mt-4 p-3" style={{ width: "30rem" }}>
        <div className="mx-auto mt-4">
          <img
            src={user?.avatar}
            className="shadow-lg border border-1"
            alt="profile"
            style={{ borderRadius: 50 }}
          />
        </div>

        <h3 className="font-weight-bold text-center">
          <svg
            className="member"
            width=".7em"
            height=".7em"
            viewBox="0 0 16 16"
            fill="#074256"
          >
            <path
              fillRule="evenodd"
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
            ></path>
          </svg>
          {"  "}
          {user?.name}
        </h3>
        <p className="text-center">{user?.bio}</p>
        <i className="email fa fa-envelope-o fa-10x"></i>
        <h1>
          <a href={`mailto:${user?.email}`}> {user?.email} </a>
        </h1>
        <div>
          <a
            href="/saved"
            onClick={getSaved}
            className="mt-5 mb-1"
            style={{ textDecoration: "none" }}
          >
            Get Saved
          </a>
        </div>
      </div>
      <div className="logout text-center mt-5">
        <button className="btn btn-primary" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};
export default Profile;
