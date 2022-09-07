import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const getUserProfile = async () => {
    const userid = window.location.pathname.split("/")[2];
    const response = await fetch(`/api/profile/${parseInt(userid)}`);
    const data = await response.json();
    setUser(data);
  };
  useEffect(() => {
    getUserProfile();
    document.title = `${user.name}'s Profile`;
  }, []);

  return (
    <div className="py-3">
      <h1 className="text-center">User Profile</h1>
      <div className="card mx-auto mt-4 p-3" style={{ width: "30rem" }}>
        <div className="mx-auto ">
          <svg
            width="6em"
            height="6em"
            viewBox="0 0 25 25"
            className="bi bi-person-fill"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path>
            <path d="M0 0h24v24H0z" fill="none"></path>
          </svg>
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
      </div>
    </div>
  );
};
export default Profile;
