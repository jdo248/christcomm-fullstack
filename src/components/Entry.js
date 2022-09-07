import { useEffect, useState } from "react";

const Entry = () => {
  const [entryId, setEntryId] = useState(null);
  const [comments, setComments] = useState([]);
  const [entry, setEntry] = useState(null);
  const [cIdxCount, setCIdxCount] = useState(1);
  const [cNxt, setCNxt] = useState(false);
  const fetchEntry = async () => {
    const response = await fetch(`/api/entries/${parseInt(entryId)}`);
    const data = await response.json();
    setEntry(data);
  };
  const fetchComments = async () => {
    const response = await fetch(
      `/api/entries/${parseInt(entryId)}/posts?page=${cIdxCount}`
    );
    const data = await response.json();
    setComments(data.results);
    if (data.next !== null) {
      setCNxt(true);
    }
  };

  useEffect(() => {
    const entryId = window.location.pathname.split("/")[2];
    setEntryId(entryId);
  }, []);
  useEffect(() => {
    fetchEntry();
    fetchComments();
  }, [entryId]);

  const dateInWords = (date) => {
    const dateObj = new Date(date);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    const hour = dateObj.getHours();
    const min = dateObj.getMinutes();
    const time = `${hour}:${min < 10 ? "0" + min : min}`;
    return `${day} ${month} ${year} at ${time}`;
  };

  return (
    <div>
      {entry !== null && (
        <div className="container">
          <div className="card post">
            <div className="card-header">
              <h3>{entry?.subject}</h3>
            </div>
            <div className="card-body">
              <p className="card-text">{entry?.content}</p>
              <p className="card-text">
                by <i className="text-primary">{entry?.creator}</i>
              </p>
              <p className="card-text text-muted">
                {dateInWords(
                  entry?.created
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join("/")
                    .concat(entry?.created.slice(10)) || 0
                )}
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h3>Comments</h3>
            </div>
            <div className="card-body">
              {comments.length > 0 &&
                comments?.map((comment) => (
                  <div
                    className="card border-0 my-2 bg-light"
                    key={comment?.id}
                  >
                    <div className="">
                      <h4
                        className="bg-primary fw-bold bg-opacity-25 fs-6 p-1 m-2 ml-14 mt-4 px-4 max-w-max-content rounded text-dark"
                        style={{ maxWidth: "max-content" }}
                      >
                        {comment?.creator}
                      </h4>
                    </div>
                    <div
                      className="card-body"
                      style={{ marginTop: "3px !important" }}
                    >
                      <p className="card-text">{comment?.content}</p>
                      <p className="card-text text-muted">{comment?.created}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Entry;
