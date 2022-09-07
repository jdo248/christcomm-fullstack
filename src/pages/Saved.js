import { useEffect, useState } from "react";

const Saved = () => {
  const [saved, setSaved] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [uid, setUid] = useState(null);
  const getSaved = async () => {
    const response = await fetch(`/api/bookmark/${uid}?page=${page}`);
    const data = await response.json();
    setSaved(data);
    setHasMore(data.length > 0);
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

  return (
    <div>
      <h1>Saved</h1>
      <div className="container">
        {saved.map((entry) => (
          <div className="card" key={entry?.id}>
            <div className="card-header">
              <h3>{entry?.subject}</h3>
            </div>
            <div className="card-body">
              <p className="card-text">{entry?.created} </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Saved;
