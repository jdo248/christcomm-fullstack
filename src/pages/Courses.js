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
        subject: "Business Management and Startups",
      },
      {
        subject: "Digital Fluency",
      },
      {
        subject: "Financial Accountinng",
      },
      {
        subject: "FInancial Literacy",
      },
      {
        subject: "Principles of Marketing",
      },
      {
        subject: "Spreadsheet for Business",
      },
    ],
    BBA: [
      {
        subject: "Business Environment",
      },
      {
        subject: "Financial Accounting and Reporting",
      },
      {
        subject: "Fundamentals of Accountancy",
      },
      {
        subject: "Human Resource Management",
      },
      {
        subject: "Management and Innovation",
      },
      {
        subject: "Marketing Management",
      },
    ],
    BCA: [
      {
        subject: "Computer Architecture",
      },
      {
        subject: "Data Structures",
      },
      {
        subject: "Database Management System",
      },
      {
        subject: "Discrete Structures",
      },
      {
        subject: "Object Oriented Programming using Java",
      },
      {
        subject: "Problem Solving Techniques",
      },
    ],
    "BA JPE": [
      {
        subject: "NEWS WRITING AND REPORTING",
      },
      {
        subject: "INTRODUCTION TO COMMUNICATION AND MEDIA",
      },
      {
        subject: "PRINT MEDIA",
      },
      {
        subject: "AUDIO VISUAL MEDIA",
      },
      {
        subject: "Media Laws",
      },
      {
        subject: "Reporting",
      }
    ],
    "BSC PM": [
      {
        subject: "Physics",
      },
      {
        subject: "Mathematics",
      },
    ],
    "BSC CM": [
      {
        subject: "Chemistry",
      },
    ],
    "BSC CSM": [
      {
        subject: "Computer Science",
      },
    ],
    "BSC PSY CS": [
      {
        subject: "Psychology",
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
