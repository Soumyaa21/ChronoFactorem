import { Component } from "react";
import React from "react";

import PreviewTT from "./PreviewTT.jsx";
import MidsemSched from "./MidsemSched.jsx";
import CompreSched from "./CompreSched.jsx";

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
 
class ExportPage extends Component {
  componentDidMount() {
    const pageToExport = document.getElementById("export-page");
    html2canvas(pageToExport)
      .then(canvas => {
        const imgData = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");

        const doc = new jsPDF({
          orientation: "landscape",
          unit: "pt"
        });
        
        doc.addImage(imgData, 'PNG', 16, 9);
        doc.save('timetable.pdf');

        window.open(imgData, "_blank");
      })
      .then(() => {
        document.getElementById("0").click();
      });
  }

  render() {
    return (
      <>
        <div id='export-page'>
          <div id='myMm' style={{ height: "1mm" }} />
          <PreviewTT />
          <h3>MidSem</h3>
          <MidsemSched />
          <h3>Compre</h3>
          <CompreSched />
        </div>
        <a id='image'></a>
      </>
    );
  }
}

export default ExportPage;
