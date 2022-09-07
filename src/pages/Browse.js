import { useEffect, useState } from "react";

const Browse = () => {
  const [posts, setPosts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [pageIdx, setPageIdx] = useState(1);
  useEffect(() => {
    const getFeed = async () => {
      const res = await fetch(`/api/entries/?page=${pageIdx}`);
      setPageIdx(pageIdx + 1);
      let pst = await res.json();
      setPosts(pst.results);
      if (pst.next === null) {
        setHasNextPage(false);
      }
    };
    getFeed();
  }, []);

  const showPost = (id) => {
    window.location.href = `/post/${id}`;
  };
  return (
    <div>
      <h1>Browse</h1>
      <div className="container mt-7" style={{ marginTop: 35 }}>
        <div className="row">
          {posts.map((post) => (
            <div className="col-md-4">
              <div className="card mb-4 border-0 box-shadow">
                <div className="bg-light card-header border-0">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="mr-2">
                        <svg
                          className="bd-placeholder-img rounded-circle"
                          width="40"
                          height="40"
                          xmlns="http://www.w3.org/2000/svg"
                          preserveAspectRatio="xMidYMid slice"
                          focusable="false"
                          role="img"
                          aria-label="creator"
                        >
                          <rect width="100%" height="100%" fill="#072256" />
                          <text x="40%" y="54%" fill="#fff" dy=".3em">
                            {post.creator[0].toUpperCase()}
                          </text>
                        </svg>
                      </div>
                      <div className="ml-2" style={{ marginLeft: 10 }}>
                        <h5 className="mb-0">{post.creator}</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text">{post.subject}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          showPost(post.id);
                        }}
                      >
                        View
                      </button>
                    </div>
                    <small className="text-muted">
                      {post.created.slice(0, 10)}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          {hasNextPage ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setPageIdx(pageIdx + 1)}
            >
              Load More
            </button>
          ) : (
            <div style={{ marginTop: "1em" }}>
              <h3>No more posts</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Browse;
