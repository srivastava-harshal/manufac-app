import React, { useState, useEffect } from "react";
import getChartData from "../../utils/getChartData";

import data from "../../utils/data.json";
import Report from "./Report";

const getMalicAvgData = () => {
  const alcohols = [...new Set(data.map((el) => el.Alcohol))]; // [1, 2, 3]
  // console.log({ alcohols });

  const meanData = {};
  for (let i = 0; i < data.length; i += 1) {
    const obj = data[i];
    const { Alcohol: alcohol = "", "Malic Acid": malicAcid } = obj;
    if (meanData.hasOwnProperty(alcohol)) {
      meanData[alcohol] = [...meanData[alcohol], malicAcid];
    } else {
      meanData[alcohol] = [malicAcid];
    }
  }

  const malicAvg = [];
  for (let i = 0; i < alcohols.length; i += 1) {
    malicAvg.push(
      (
        meanData[alcohols[i]].reduce((acc, el) => acc + el) /
        meanData[alcohols[i]].length
      ).toFixed(2)
    );
  }

  // console.log(malicAvg);
  return { x: alcohols, y: malicAvg };
};

const reportsToPlot = [
  { id: "scatter-1", type: "scatter", x: "Hue", y: "Color intensity" },
  {
    id: "bar-1",
    type: "bar",
    ...getMalicAvgData(),
    xName: "Alcohols",
    yName: "Average Malic Acid",
  },
];

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    setReports(getChartData(reportsToPlot));
  }, []);

  return (
    <div className="container">
      {reports.map((report) => (
        <div key={report.id} className="report-card">
          <Report report={report} />
        </div>
      ))}
    </div>
  );
};

export default Reports;
