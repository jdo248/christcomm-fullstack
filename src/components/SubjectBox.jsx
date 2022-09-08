import { useNavigate } from "react-router-dom";

const SubjectBox = (props) => {
    const navigate = useNavigate()
    const goToSubject = (e) => {
        navigate(`/subject/${props.subjectname}`);
    }
    return (
        <div className="subject-box bg-white p-4 rounded shadow min-vw-25 col-md-4 mb-4" style={{width: "33.33333% !important" }}>
        <div className="head font-semibold d-flex w-100 flex-row align-items-start justify-content-between">
            <p> <mark className="rounded-pill p-1 px-3">{props.cname}</mark></p>
            <input type="image" className="go-arrow" style={{width: 40}} src="https://img.icons8.com/sf-black/344/circled-right-2.png" alt="go-arrow"
            onClick={goToSubject}/>
        </div>
        <div className="subject-box fs-3 fw-bold mt-5">
            {props.subjectname}
        </div>
        </div>
    );
    }
export default SubjectBox;
