import data from "./data.json";

const scatterPlot = ({ x, y }) => {
  if (!x || !y) {
    return [];
  }

  const dataToMap = data.map((el) => {
    return [el[x], el[y]];
  });

  const options = {
    xAxis: {
      name: x,
      nameLocation: "middle",
      nameTextStyle: {
        verticalAlign: "top",
        lineHeight: 25,
      },
    },
    yAxis: {
      name: y,
      nameLocation: "middle",
      nameTextStyle: {
        verticalAlign: "bottom",
        lineHeight: 30,
      },
    },
    series: [
      {
        symbolSize: 12,
        data: dataToMap,
        type: "scatter",
      },
    ],
  };

  return options;
};

const barPlot = ({ x, xName, y, yName }) => {
  if (!x || !y) {
    return [];
  }

  const options = {
    xAxis: {
      type: "category",
      data: x,
      name: xName,
      nameLocation: "middle",
      nameTextStyle: {
        verticalAlign: "top",
        lineHeight: 25,
      },
    },
    yAxis: {
      type: "value",
      name: yName,
      nameLocation: "middle",
      nameTextStyle: {
        verticalAlign: "bottom",
        lineHeight: 30,
      },
    },
    series: [
      {
        data: y,
        type: "bar",
      },
    ],
  };

  return options;
};

const getChartData = (data = []) => {
  const reports = [];
  for (let i = 0; i < data.length; i++) {
    const obj = data[i];
    const { type } = obj;
    let report;
    switch (type) {
      case "scatter":
        report = scatterPlot(obj);
        break;
      case "bar":
        report = barPlot(obj);
        break;
      default:
        break;
    }
    report = { ...report, id: obj.id };
    reports.push(report);
  }

  //   const scatterData = scatterPlot("Hue", "Color intensity");
  return reports;
};

export default getChartData;
