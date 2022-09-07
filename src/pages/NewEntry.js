import AddEntry from "../components/AddEntry";

const NewEntry = () => {
  return (
    <div className="NewEntry">
      <h1>Add a new resource</h1>
      <div
        className="container mt-7 p-4 bg-light mb-4"
        style={{ marginTop: 35, borderRadius: "0.5em" }}
      >
        <AddEntry />
      </div>
    </div>
  );
};

export default NewEntry;
