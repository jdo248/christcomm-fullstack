import { Button } from "react-bootstrap";

const CButton = (props) => {
  return (
    <button
      className={`btn btn-${props.color} ${props.className}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};
export default CButton;
