import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import businessmanagementandstartups from "../components/pdf/businessmanagementandstartups.pdf";
import digitalfluency from "../components/pdf/digitalfluency.pdf";
import financialaccounting from "../components/pdf/financialaccounting.pdf";
import financialliteracy from "../components/pdf/financialliteracy.pdf";
import principlesofmarketing from "../components/pdf/principlesofmarketing.pdf";
import spreadsheetforbusiness from "../components/pdf/spreadsheetforbusiness.pdf";
import businessenvironment from "../components/pdf/businessenvironment.pdf";
import financialaccountingandreporting from "../components/pdf/financialaccountingandreporting.pdf";
import fundamentalsofaccountancy from "../components/pdf/fundamentalsofaccountancy.pdf";
import humanresourcemanagement from "../components/pdf/humanresourcemanagement.pdf";
import managementandinnovation from "../components/pdf/managementandinnovation.pdf";
import marketingmanagement from "../components/pdf/marketingmanagement.pdf";
import computerarchitecture from "../components/pdf/computerarchitecture.pdf";
import datastructures from "../components/pdf/datastructures.pdf";
import databasemanagementsystem from "../components/pdf/databasemanagementsystem.pdf";
import discretestructures from "../components/pdf/discretestructures.pdf";
import oopusingjava from "../components/pdf/oopusingjava.pdf";
import problemsolvingtechniques from "../components/pdf/problemsolvingtechniques.pdf";
import newswritingandreporting from "../components/pdf/newswritingandreporting.pdf";
import introductiontocommunicationandmedia from "../components/pdf/introductiontocommunicationandmedia.pdf";
import printmedia from "../components/pdf/printmedia.pdf";
import audiovisualmedia from "../components/pdf/audiovisualmedia.pdf";
import medialaws from "../components/pdf/medialaws.pdf";
import reporting from "../components/pdf/reporting.pdf";
import physics from "../components/pdf/physics.pdf";
import mathematics from "../components/pdf/mathematics.pdf";
import chemistry from "../components/pdf/chemistry.pdf";
import computerscience from "../components/pdf/computerscience.pdf";
import psychology from "../components/pdf/psychology.pdf";

const mapLinkTOName = {
  businessmanagementandstartups,
  digitalfluency,
  financialaccounting,
  financialliteracy,
  principlesofmarketing,
  spreadsheetforbusiness,
  businessenvironment,
  financialaccountingandreporting,
  fundamentalsofaccountancy,
  humanresourcemanagement,
  managementandinnovation,
  marketingmanagement,
  computerarchitecture,
  datastructures,
  databasemanagementsystem,
  discretestructures,
  oopusingjava,
  problemsolvingtechniques,
  newswritingandreporting,
  introductiontocommunicationandmedia,
  printmedia,
  audiovisualmedia,
  medialaws,
  reporting,
  physics,
  mathematics,
  chemistry,
  computerscience,
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
