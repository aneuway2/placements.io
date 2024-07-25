import {
  DataVizPalette,
  getColorFromToken,
  IVerticalStackedChartProps,
  IVSChartDataPoint,
  VerticalStackedBarChart,
} from "@fluentui/react-charting";
import { makeStyles } from "@fluentui/react-components";

export type Summary = {
  booked_amount: number;
  actual_amount: number;
  adjustment: number;
  recorded_amount: number;
};

const useStyles = makeStyles({
  container: {
    flex: "2 1 67%",
    padding: "20px",
  },
});

export const BookedVsActualChart = ({ data }: { data: Summary }) => {
  const style = useStyles();
  const bookedPoints: IVSChartDataPoint[] = [
    {
      legend: "Booked",
      data: data.booked_amount,
      color: getColorFromToken(DataVizPalette.color11),
    },
  ];

  const actualPoints: IVSChartDataPoint[] = [
    {
      legend: "Actual",
      data: data.actual_amount,
      color: getColorFromToken(DataVizPalette.color6),
    },
    {
      legend: "Adjustments",
      data: data.adjustment > 0 ? data.adjustment : 0,
      color: getColorFromToken(DataVizPalette.color7),
    },
  ];

  const recordedPoints: IVSChartDataPoint[] = [
    {
      legend: "Recorded",
      data: data.recorded_amount,
      color: getColorFromToken(DataVizPalette.color13),
    },
  ];

  const datapoints: IVerticalStackedChartProps[] = [
    { chartData: bookedPoints, xAxisPoint: "Booked" },
    {
      chartData: actualPoints,
      xAxisPoint: "Actual",
    },
    {
      chartData: recordedPoints,
      xAxisPoint: "Recorded",
    },
  ];
  return (
    <div className={style.container}>
      <VerticalStackedBarChart
        chartTitle="Vertical stacked bar chart axis tooltip example"
        data={datapoints}
        height={400}
        width={400}
        showXAxisLablesTooltip={true}
        wrapXAxisLables={true}
        barWidth={"auto"}
        maxBarWidth={300}
      />
    </div>
  );
};
