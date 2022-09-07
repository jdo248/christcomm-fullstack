import { useState } from "react";
import SubjectBox from "../components/SubjectBox";
import { courseData } from "../helpers/courseData";

const Courses = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const showSubjects = (e) => {
    e.preventDefault();
    setSelectedSubject(e.target.value);
  };

  const subArr = {
    BCOM: [
      {
        subject: "Subject 1",
        syllabuslink: "https://www.google.com",
      },
      {
        subject: "Subject 2",
        syllabuslink: "https://www.google.com",
      },
      {
        subject: "Subject 3",
        syllabuslink: "https://www.google.com",
      },
    ],
    BBA: [
      {
        subject: "Subject 1b",
        syllabuslink: "https://www.google.com",
      },
      {
        subject: "Subject 2b",
        syllabuslink: "https://www.google.com",
      },
      {
        subject: "Subject 3b",
        syllabuslink: "https://www.google.com",
      },
    ],
    BCA: [
      {
        subject: "Subject 1c",
        syllabuslink: "https://www.google.com",
      },
      {
        subject: "Subject 2c",
        syllabuslink: "https://www.google.com",
      },
    ],
    "BA JPE": [
      {
        subject: "Subject 1j",
        syllabuslink: "https://www.google.com",
      },
    ],
    "BSC PM": [
      {
        subject: "Sub 1",
        syllabuslink: "sass",
      },
    ],
    "BSC CM": [
      {
        subject: "Sub 1",
        syllabuslink: "google",
      },
    ],
    "BSC CSM": [
      {
        subject: "Sub 2h",
        syllabuslink: "",
      },
    ],
    "BSC PSY CS": [
      {
        subject: "Sub 5h",
        syllabuslink: "",
      },
    ],
  };
  return (
    <div>
      <h1>Courses</h1>
      <p className="mt-1 w-25">
        Christ Academy offers many courses for students to choose from. Here are
        some of the courses that are available.
      </p>
      <div className="mt-2">
        <div className="d-flex flex-row">
          {Object.keys(subArr).map((key, index) => {
            return (
              <div className="p-2">
                <button
                  className="shadow btn btn-primary btn-sm rounded"
                  type="button"
                  data-toggle="collapse"
                  data-target={`#collapse${index}`}
                  aria-expanded="false"
                  aria-controls={`collapse${index}`}
                  onClick={showSubjects}
                  value={key}
                >
                  {key}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="d-flex flex-wrap justify-content-around mt-2">
        {<h5 className="w-100 fw-semibold mt-1 px-2">{selectedSubject}</h5>}
        {selectedSubject && (
          <div className="text-dark text-opacity-50 px-2 mb-5 mt-0 text-left w-100">
            {courseData[selectedSubject].content}
          </div>
        )}
        {selectedSubject &&
          subArr[selectedSubject].map((subject, index) => {
            return (
              <SubjectBox
                subjectname={subject.subject}
                cname={selectedSubject}
              />
            );
          })}
      </div>
    </div>
  );
};
export default Courses;
