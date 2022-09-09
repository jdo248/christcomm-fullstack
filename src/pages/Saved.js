import { useEffect, useState } from "react";

const Saved = () => {
  const [saved, setSaved] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [uid, setUid] = useState(null);
  const getSaved = async () => {
    const response = await fetch(`/api/bookmark/${uid}?page=${page}`);
    const data = await response.json();
    setSaved(data.results);
    setHasMore(data.next !== null);
  };
  useEffect(() => {
    const userid = window.localStorage.getItem("user");
    setUid(JSON.parse(userid).user_id);
  }, []);
  useEffect(() => {
    if (uid) {
      getSaved();
    }
  }, [uid]);

  const showPost = (id) => {
    window.location.href = `/post/${id}`;
  };

  return (
    <div>
      <h1>Saved</h1>
      <div className="container mt-3 w-50 m-auto">
        {saved.map((entry) => (
          <div
            className="card mb-4"
            key={entry?.id}
            onClick={() => showPost(entry?.id)}
            style={{ cursor: "pointer" }}
          >
            <div className="card-header">
              <h3>{entry?.subject}</h3>
            </div>
            <div className="card-body">
              <p className="card-text">{entry?.created.slice(0, 10)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Saved;
