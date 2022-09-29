import React from "react";
import ReactECharts from "echarts-for-react";

const Report = ({ report }) => {
  const { type } = report;
  return (
    <div className="report-wrapper">
      <ReactECharts option={report} />
    </div>
  );
};

export default Report;
