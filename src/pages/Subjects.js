import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import newswritingandreporting from "../components/pdf/newswritingandreporting.pdf";
import introductiontocommunicationandmedia from "../components/pdf/introductiontocommunicationandmedia.pdf";
import printmedia from "../components/pdf/printmedia.pdf";
import audiovisualmedia from "../components/pdf/audiovisualmedia.pdf";
import medialaws from "../components/pdf/medialaws.pdf";
import reporting from "../components/pdf/reporting.pdf";
import businessmanagementstartups from "../components/pdf/businessmanagementstartups.pdf";
import digitalfluency from "../components/pdf/digitalfluency.pdf";
import financialaccountancy from "../components/pdf/financialaccountancy.pdf";
import financialliteracy from "../components/pdf/financialliteracy.pdf";
import principlesofmarketing from "../components/pdf/principlesofmarketing.pdf";
import spreadsheetforbusiness from "../components/pdf/spreadsheetforbusiness.pdf";
import businessenvironment from "../components/pdf/businessenvironment.pdf";
import financialaccountingreporting from "../components/pdf/financialaccountingreporting.pdf";
import fundamentalsofaccountancy from "../components/pdf/fundamentalsofaccountancy.pdf";
import humanresourcemanagement from "../components/pdf/humanresourcemanagement.pdf";
import managementinnovation from "../components/pdf/managementinnovation.pdf";
import marketingmanagement from "../components/pdf/marketingmanagement.pdf";
import computerarchitecture from "../components/pdf/computerarchitecture.pdf";
import datastructures from "../components/pdf/datastructures.pdf";
import databasemanagementsystem from "../components/pdf/databasemanagementsystem.pdf";
import discretestructures from "../components/pdf/discretestructures.pdf";
import java from "../components/pdf/java.pdf";
import problemsolvingtechniques from "../components/pdf/problemsolvingtechniques.pdf";
import computerscience from "../components/pdf/computerscience.pdf";
import chemistry from "../components/pdf/chemistry.pdf";
import mathematics from "../components/pdf/mathematics.pdf";
import physics from "../components/pdf/physics.pdf";
import psychology from "../components/pdf/psychology.pdf";

const mapLinkTOName = {
  newswritingandreporting,
  introductiontocommunicationandmedia,
  printmedia,
  audiovisualmedia,
  medialaws,
  reporting,
  businessmanagementstartups,
  digitalfluency,
  financialaccountancy,
  financialliteracy,
  principlesofmarketing,
  spreadsheetforbusiness,
  businessenvironment,
  financialaccountingreporting,
  fundamentalsofaccountancy,
  humanresourcemanagement,
  managementinnovation,
  marketingmanagement,
  computerarchitecture,
  datastructures,
  databasemanagementsystem,
  discretestructures,
  java,
  problemsolvingtechniques,
  chemistry,
  computerscience,
  mathematics,
  physics,
  psychology,
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
