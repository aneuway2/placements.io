import { makeStyles } from "@fluentui/react-components";
import { BookedVsActualChart } from "./BookedVsActualChart.tsx";
import React from "react";

const useStyles = makeStyles({
  container: {
    display: "flex",
    width: "100%",
    height: "400px",
    backgroundColor: "#f3f2f1",
    marginBottom: "20px",
  },
  graphArea: {
    flex: "2 1 67%",
  },
});

export const Metrics = ({
  data,
  TileComponent,
}: {
  data: any;
  TileComponent: React.ComponentType<{ data: any }>;
}) => {
  const style = useStyles();
  return (
    <div className={style.container}>
      <TileComponent data={data} />
      <div className={style.graphArea}>
        <BookedVsActualChart data={data.summary} />
      </div>
    </div>
  );
};
