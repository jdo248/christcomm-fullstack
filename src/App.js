import { useRoutes } from "react-router-dom";
import "./App.css";
import links from "./helpers/links";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const rt = useRoutes(
    links(
      window.localStorage.getItem("token"),
      window.localStorage.getItem("isAdmin")
    )
  );
  return <> {rt}</>;
}

export default App;
