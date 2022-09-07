import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import newswritingandreporting from "../components/pdf/newswritingandreporting.pdf";
import introductiontocommunicationandmedia from "../components/pdf/introductiontocommunicationandmedia.pdf";
import printmedia from "../components/pdf/printmedia.pdf";
import audiovisualmedia from "../components/pdf/audiovisualmedia.pdf";

const mapLinkTOName = {
  newswritingandreporting,
  introductiontocommunicationandmedia,
  printmedia,
  audiovisualmedia,
};
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const Subjects = () => {
  const [subject, setSubject] = useState("");
  const [pdfName, setPdfName] = useState("");
  useEffect(() => {
    const subject = window.location.pathname.split("/")[2];
    const sub1 = subject.replace(/%20/g, " ");
    setSubject(sub1);
    const pdfName = sub1.split(" ").join("").toLocaleLowerCase();
    setPdfName(pdfName);
  }, []);

  return (
    <div>
      <h1>{subject}</h1>
      <div className="w-100 mt-4">
        <Document
          file={mapLinkTOName[pdfName]}
          onLoadError={console.error}
          onLoadSuccess={console.log("success")}
          style={{
            height: "100vh",
            width: "100vw",
            overflow: "auto",
          }}
          display="flex"
        >
          <Page pageNumber={1} />
        </Document>
      </div>
    </div>
  );
};
export default Subjects;
