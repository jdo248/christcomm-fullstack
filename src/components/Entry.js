import { useEffect, useState } from "react";

const Entry = () => {
  const [entryId, setEntryId] = useState(null);
  const [comments, setComments] = useState([]);
  const [entry, setEntry] = useState(null);
  const [cIdxCount, setCIdxCount] = useState(1);
  const [cNxt, setCNxt] = useState(false);
  const [showCmntModal, setShowCmntModal] = useState(false);
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
    document.title = "Resource";
  }, []);
  useEffect(() => {
    fetchEntry();
    fetchComments().then(() => {
      document.title = entry?.subject || "Resource";
    });
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

  const addComment = async (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const newComment = {
      content: comment,
      resource: entryId,
      creator: {
        user: JSON.parse(localStorage.getItem("user")),
      },
    };
    const response = await fetch("/api/addComment/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    });
    const data = await response.json();
    setComments([...comments, data]);
    e.target.comment.value = "";
    showCmntModal(false);
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
                by{" "}
                <a
                  href={`/uprofile/${entry?.creator_id}`}
                  style={{ textDecoration: "none" }}
                >
                  <i className="text-primary">{entry?.creator}</i>
                </a>
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
                    <div className="" style={{ marginBottom: "-1rem" }}>
                      <h4
                        className="bg-primary fw-bold bg-opacity-25 fs-6 p-2 max-w-max-content rounded text-dark"
                        style={{
                          maxWidth: "max-content",
                        }}
                      >
                        <a
                          href={`/uprofile/${comment?.creator_id}`}
                          style={{ textDecoration: "none" }}
                        >
                          {" "}
                          {comment?.creator}
                        </a>
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
      )}{" "}
      <div className="fixed-bottom d-flex justify-content-end p-3">
        <button
          className={`bg-transparent border-0 ${showCmntModal ? "d-none" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            setShowCmntModal(true);
          }}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 1000"
            width={50}
            height={50}
            fill="#074256"
          >
            <g>
              <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
                <path d="M1344.1,4369.4c-514.9-103.4-958.9-476.6-1138.9-957C98.1,3133,100,3159.7,100,1029.4c0-2128.5-1.9-2103.6,103.4-2381.1c147.4-388.6,493.8-736.9,882.4-882.4c237.3-90,371.3-105.3,939.8-105.3H2550V-3216c0-761.8,3.8-880.5,30.6-918.8c15.3-23,47.9-42.1,70.8-42.1c28.7,0,312,271.8,960.9,918.8l918.7,918.7h1984.9c2118.9,0,2105.5,0,2379.2,95.7c377.1,130.2,746.5,491.9,893.9,876.6c112.9,289,111,250.8,111,2396.4c0,2130.3,1.9,2103.6-105.3,2383c-145.5,390.5-516.8,758-899.6,890c-281.4,99.5-135.9,95.7-3910.4,93.8C2171,4394.3,1443.7,4390.5,1344.1,4369.4z M5411.5,2512.8l47.9-45.9v-490v-488.1h488.1h490l45.9-47.9c47.9-45.9,47.9-49.8,47.9-411.5c0-361.8,0-365.6-47.9-411.5l-45.9-47.9h-490h-488.1V81.9v-490l-47.9-45.9c-45.9-47.9-49.8-47.9-411.5-47.9c-361.8,0-365.6,0-411.5,47.9l-47.9,45.9v490V570h-488.1h-490l-45.9,47.9c-47.9,45.9-47.9,49.8-47.9,411.5c0,361.8,0,365.6,47.9,411.5l45.9,47.9h490h488.1v488.1v490l47.9,45.9c45.9,47.9,49.8,47.9,411.5,47.9C5361.8,2560.6,5365.6,2560.6,5411.5,2512.8z" />
              </g>
            </g>
          </svg>
        </button>
      </div>
      {showCmntModal && (
        <div
          className="w-100 h-100 m-auto bg-dark bg-opacity-25 d-flex position-fixed top-0 start-0 z-index-1 bottom-0 end-0"
          role="dialog"
          style={{ backdropFilter: "blur(10px)" }}
        >
          <div
            className="modal-dialog bg-light rounded p-2 pb-3 px-3 w-75 m-auto"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-semibold">Add Comment</h5>
                <button
                  type="button"
                  className="close bg-transparent border-0 shadow-none"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowCmntModal(false)}
                >
                  <span aria-hidden="true" className="fw-bold fs-4">
                    x
                  </span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={addComment}>
                  <div className="form-group mt-3">
                    <label htmlFor="comment">Comment</label>
                    <textarea
                      className="form-control"
                      id="comment"
                      name="comment"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary mt-4">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Entry;
