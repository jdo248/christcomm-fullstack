import { useEffect, useState } from "react";

const Syllabus = () => {
  const syllbusArr = {
    course1: [
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
    course2: [
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
      {
        subject: "Subject 4b",
        syllabuslink: "https://www.google.com",
      },
    ],
    course3: [
      {
        subject: "Subject 1c",
        syllabuslink: "https://www.google.com",
      },
      {
        subject: "Subject 2c",
        syllabuslink: "https://www.google.com",
      },
    ],
  };
  const syllabusCombined = [
    {
      course: "BBA",
      syllabus: "google.com/course1",
    },
    {
      course: "BCA",
      syllabus: "google.com/course2",
    },
    {
      course: "BA JPE",
      syllabus: "google.com/course3",
    },
  ];

  return (
    <div>
      <h1>Syllabus</h1>
      <div className="max">
        <table className="table rounded bg-light bg-opacity-25 mt-4">
          <thead>
            <tr>
              <th scope="col w-50">Course</th>
              <th scope="col w-50">Syllabus</th>
            </tr>
          </thead>
          <tbody>
            {syllabusCombined.map((course) => {
              return (
                <tr className="">
                  <td className="text-uppercase fs-4 fw-bold align-middle">
                    {course.course}
                  </td>
                  <td>
                    <a href={course.syllabus}>{course.syllabus}</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Syllabus;
